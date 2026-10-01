
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Check required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          error: 'Name, email and message are required.',
        },
        { status: 400 }
      );
    }

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,

      // Reply button se visitor ko direct reply kar sakte ho
      replyTo: email,

      subject: `New message from ${name}`,

      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,

      html: `
        <h1>New message from ${name}</h1>

        <p>
          <strong>Email:</strong> ${email}
        </p>

        <p>
          <strong>Message:</strong>
        </p>

        <p>${message}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        success: true,
        message: 'Your message was successfully sent.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to send email.',
      },
      { status: 500 }
    );
  }
}

