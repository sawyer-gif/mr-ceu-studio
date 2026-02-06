export const config = { runtime: "nodejs" };

function getCookie(cookieHeader: string | null, name: string) {
  if (!cookieHeader) return null;
  const parts = cookieHeader.split(";").map(p => p.trim());
  const found = parts.find(p => p.startsWith(name + "="));
  return found ? decodeURIComponent(found.split("=").slice(1).join("=")) : null;
}

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "GET") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }

    const cookieHeader = req.headers?.cookie ?? null;
    const session = getCookie(cookieHeader, "admin_session");

    if (session !== "authenticated") {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const baseId = process.env.AIRTABLE_BASE_ID;
    const token = process.env.AIRTABLE_TOKEN;

    if (!baseId || !token) {
      res.status(500).json({ error: "Missing Airtable env vars" });
      return;
    }

    const url =
      `https://api.airtable.com/v0/${baseId}/Waitlist` +
      `?pageSize=50&sort[0][field]=Created%20At&sort[0][direction]=desc`;

    const r = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await r.json();
    res.status(r.status).json(data);
  } catch (err: any) {
    res.status(500).json({ error: "Server error", details: String(err?.message ?? err) });
  }
}
