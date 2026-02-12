import type { VercelRequest, VercelResponse } from "@vercel/node";

interface WaitlistPayload {
  firstName?: string;
  lastName?: string;
  company?: string;
  role?: string;
  email?: string;
}

const REQUIRED_FIELDS: Array<keyof WaitlistPayload> = [
  "firstName",
  "lastName",
  "company",
  "email",
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const baseId = process.env.AIRTABLE_BASE_ID;
    const token = process.env.AIRTABLE_TOKEN;
    const tableName = process.env.AIRTABLE_TABLE_NAME || "Waitlist";

    if (!baseId || !token) {
      return res
        .status(500)
        .json({ error: "Missing AIRTABLE_BASE_ID or AIRTABLE_TOKEN" });
    }

    const parsedBody =
      typeof req.body === "string" && req.body.length
        ? JSON.parse(req.body)
        : req.body;
    const body = (parsedBody || {}) as WaitlistPayload;

    for (const field of REQUIRED_FIELDS) {
      if (!body[field] || !String(body[field]).trim()) {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.email))) {
      return res.status(400).json({ error: "Valid email required" });
    }

    const checkUrl = new URL(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`
    );
    checkUrl.searchParams.set(
      "filterByFormula",
      `LOWER({Email})='${String(body.email).trim().toLowerCase()}'`
    );

    const existingResp = await fetch(checkUrl.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!existingResp.ok) {
      return res.status(existingResp.status).json({ error: "Airtable error" });
    }

    const existingData = (await existingResp.json()) as { records?: unknown[] };
    if (existingData.records && existingData.records.length > 0) {
      return res.status(409).json({ error: "Already on waitlist" });
    }

    const airtableUrl = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(
      tableName
    )}`;

    const payload = {
      fields: {
        FirstName: body.firstName,
        LastName: body.lastName,
        Company: body.company,
        Role: body.role || "Architect",
        Email: body.email,
        Source: "MR CEU Studio",
      },
    };

    const airtableResp = await fetch(airtableUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!airtableResp.ok) {
      const errorText = await airtableResp.text();
      return res
        .status(airtableResp.status)
        .json({ error: errorText || "Airtable create failed" });
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error?.message || "Server error" });
  }
}
