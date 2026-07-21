import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { password } = await request.json();

  if (password === process.env.STAFF_PASSWORD) {
    const response = NextResponse.json({ success: true });
    response.cookies.set('staff_auth', 'true', {
      httpOnly: true,
      maxAge: 60 * 60 * 8, // 8 hour session
      path: '/',
    });
    return response;
  }

  return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
}
