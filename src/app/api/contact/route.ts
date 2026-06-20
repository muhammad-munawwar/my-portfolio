import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

function compileTemplate(templateName: string, data: Record<string, unknown>): string {
  const templatePath = path.join(process.cwd(), 'src', 'templates', `${templateName}.hbs`);
  const templateSource = fs.readFileSync(templatePath, 'utf-8');
  const template = Handlebars.compile(templateSource);
  return template(data);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { formName, firstName, lastName, email, phone, company, website, message, projectRequirements, projectName } = data;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Needs to be a Gmail App Password
      },
    });

    const isProjectInquiry = formName === 'project-inquiry';

    const subject = isProjectInquiry
      ? `⚡ New Project Inquiry: ${projectName} — from ${firstName} ${lastName}`
      : `✦ New Contact Request from ${firstName} ${lastName}`;

    // Compile the appropriate Handlebars template
    const htmlContent = isProjectInquiry
      ? compileTemplate('inquiry', { firstName, lastName, email, phone, projectName, projectRequirements })
      : compileTemplate('contact', { firstName, lastName, email, phone, company, website, message });

    const mailOptions = {
      from: `"Portfolio Bot" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject,
      html: htmlContent,
      replyTo: email,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email.' },
      { status: 500 }
    );
  }
}
