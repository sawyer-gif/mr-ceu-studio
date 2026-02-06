import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
const cookieStore = await cookies();
const session = cookieStore.get('admin_session');

  if (session?.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const token = process.env.AIRTABLE_TOKEN;

    const res = await fetch(`https://api.airtable.com/v0/${baseId}/Waitlist?pageSize=50&sort[0][field]=Created At&sort[0][direction]=desc`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

