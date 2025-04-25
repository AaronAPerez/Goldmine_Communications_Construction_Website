import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Define the expected request body type
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const data: ContactFormData = await request.json();
    
    // Basic validation
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { success: false, message: 'Name, email and message are required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Configure nodemailer transporter
    // For production, you'll want to use an actual SMTP provider
    const transporter = nodemailer.createTransport({
      // For development/testing, use a service like Mailtrap or Ethereal
      // host: process.env.EMAIL_SERVER || 'smtp.mailtrap.io',
      // port: parseInt(process.env.EMAIL_PORT || '2525'),
      // auth: {
      //   user: process.env.EMAIL_USER,
      //   pass: process.env.EMAIL_PASSWORD,
      // },
      // For production with a real service like Gmail:
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Set up email content
    const mailOptions = {
      from: `"Website Contact Form" <${process.env.EMAIL_FROM || 'noreply@goldminecomm.net'}>`,
      to: process.env.EMAIL_TO || 'info@goldminecomm.net',
      replyTo: data.email,
      subject: `New Contact Form Submission - ${data.service || 'General Inquiry'}`,
      text: `
        Name: ${data.name}
        Email: ${data.email}
        Phone: ${data.phone || 'Not provided'}
        Service: ${data.service || 'Not specified'}
        
        Message:
        ${data.message}
      `,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #D4AF37; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Website Contact Form Submission</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Name:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">
                <a href="mailto:${data.email}" style="color: #D4AF37;">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.phone || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Service:</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.service || 'Not specified'}</td>
            </tr>
          </table>
          
          <h3 style="color: #333;">Message:</h3>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; white-space: pre-line;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
          
          <p style="color: #777; margin-top: 30px; font-size: 12px;">
            This email was sent from the contact form on the Goldmine Communications and Construction website.
          </p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Return success response
    return NextResponse.json(
      { success: true, message: 'Message sent successfully!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Return error response
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send message. Please try again later.',
        error: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}