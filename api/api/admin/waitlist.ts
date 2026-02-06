import type { VercelRequest, VercelResponse } from "@vercel/node";

function parseCookies(cookieHeader: string | undefined) {
  const out: Record<string, string> = {};
  if (!cookieHeader) return out;
  cookieHeader.split(";").forEach((part) => {
    const [k, ...v] = part.trim().split("=");
    if (!k) return;
    out[k] = decodeURIComponent(v.join("=") || "");
  });
  return out;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // ✅ auth check (cookie)
    const cookies = parseCookies(req.headers.cookie);
    const session = cookies["admin_session"];
    if (session !== "authenticated") {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const baseId = process.env.AIRTABLE_BASE_ID;
    const token = process.env.AIRTABLE_TOKEN;

    if (!baseId || !token) {
      return res.status(500).json({ error: "Missing Airtable env vars" });
    }

    const url =
      `https://api.airtable.com/v0/${baseId}/Waitlist` +
      `?pageSize=50&sort[0][field]=Created%20At&sort[0][direction]=desc`;

    const airtableRes = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await airtableRes.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ error: "Failed to fetch" });
  }
}
