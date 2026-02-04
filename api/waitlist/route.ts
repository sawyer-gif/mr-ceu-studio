import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, firstName, lastName, firm, role, source } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const baseId = process.env.AIRTABLE_BASE_ID;
    const token = process.env.AIRTABLE_TOKEN;

    // Check for duplicate first
    const filter = `({Email} = '${email}')`;
    const checkRes = await fetch(`https://api.airtable.com/v0/${baseId}/Waitlist?filterByFormula=${encodeURIComponent(filter)}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    const checkData = await checkRes.json();
    if (checkData.records && checkData.records.length > 0) {
      return NextResponse.json({ message: 'Already exists' }, { status: 409 });
    }

    // Create record
    const createRes = await fetch(`https://api.airtable.com/v0/${baseId}/Waitlist`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        records: [{
          fields: {
            Email: email,
            'First Name': firstName,
            'Last Name': lastName,
            Firm: firm,
            Role: role,
            Source: source,
            Status: 'Waitlist'
          }
        }]
      })
    });

    if (!createRes.ok) {
      throw new Error('Airtable create failed');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Waitlist API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}