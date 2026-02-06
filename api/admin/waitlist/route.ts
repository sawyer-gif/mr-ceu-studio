import type { VercelRequest, VercelResponse } from "@vercel/node";

function getCookie(req: VercelRequest, name: string) {
  const raw = req.headers.cookie || "";
  const parts = raw.split(";").map((p) => p.trim());
  const found = parts.find((p) => p.startsWith(`${name}=`));
  if (!found) return null;
  return decodeURIComponent(found.substring(name.length + 1));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Only allow GET
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Optional: simple admin cookie check (matches your earlier idea)
    // Set ADMIN_SESSION_VALUE in Vercel env if you want this enforced.
    const expectedSession = process.env.ADMIN_SESSION_VALUE;
    if (expectedSession) {
      const session = getCookie(req, "admin_session");
      if (session !== expectedSession) {
        return res.status(401).json({ error: "Unauthorized" });
      }
    }

    // Airtable settings (set these in Vercel > Project > Settings > Environment Variables)
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME || "Waitlist";
    const token = process.env.AIRTABLE_TOKEN;

    if (!baseId || !token) {
      return res.status(500).json({
        error: "Missing AIRTABLE_BASE_ID or AIRTABLE_TOKEN env vars",
      });
    }

    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(
      tableName
    )}?pageSize=50&sort[0][field]=Created&sort[0][direction]=desc`;

    const r = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || "Server error" });
  }
}
