
import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    streetAddress,
    city,
    province,
    postalCode,
    country,
    amount,
    message,
  } = await req.json()

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECIPIENT_EMAIL,
    subject: 'New Donation Enquiry',
    text: `
      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phoneNumber}
      Address: ${streetAddress}, ${city}, ${province}, ${postalCode}, ${country}
      Amount: ${amount}
      Message: ${message}
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Error sending email', error },
      { status: 500 }
    )
  }
}
