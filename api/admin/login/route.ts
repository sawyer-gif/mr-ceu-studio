import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (
      email === process.env.ADMIN_EMAIL && 
      password === process.env.ADMIN_PASSWORD
    ) {
      // In a real app, use a proper session library (like iron-session or jose)
      // For this v1, we'll set a simple signed cookie or similar
      const response = NextResponse.json({ success: true });
      response.cookies.set('admin_session', 'authenticated', {
        httpOnly: true,
        secure: true,
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
      return response;
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Server Error' }, { status: 500 });
  }
}