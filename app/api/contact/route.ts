import { Resend } from 'resend';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, phone, message, company, subject } = await request.json();

    if (!name?.trim() || !email?.trim() || !phone?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Resend API key not configured' }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const toEmail = process.env.CONTACT_EMAIL || 'ayaan.fareed2001@gmail.com';

    await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: toEmail,
      replyTo: email,
      subject: subject?.trim() ? `Contact: ${subject}` : `New quote request from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Company:</strong> ${company?.trim() || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject?.trim() || 'Not provided'}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
