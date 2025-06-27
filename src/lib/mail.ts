// import {Resend} from 'resend'

// const resend = new Resend(process.env.RESEND_API_KEY)

// export const sendVerificationEmail =  async(email:string,token:string)=>{
//     const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`

//     await resend.emails.send({
//         from: "Acme <onboarding@resend.dev>",
//         to: email,
//         subject: "Confirm your email",
//         html:`<p>Click<a href="${confirmLink}">here</a> to confirm email.</p>`
//     })
// }

// export const sendPasswordResetEmail =  async(email:string,token:string)=>{
//     const resetLink = `http://localhost:3000/auth/new-password?token=${token}`

//     await resend.emails.send({
//         from: "Acme <onboarding@resend.dev>",
//         to: email,
//         subject: "Reset your password",
//         html:`<p>Click<a href="${resetLink}">here</a> to reset your password.</p>`
//     })
// }

// lib/mail.ts or utils/mail.ts

import nodemailer from "nodemailer";

// Use the deployment URL if available, fallback to localhost for dev
const BASE_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

// Setup the mail transporter using your Gmail credentials
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,     // Gmail address
    pass: process.env.SMTP_PASS,     // App password (not your actual password)
  },
});

// 🔐 Send email verification link
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${BASE_URL}/auth/new-verification?token=${token}`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
      <h2 style="color: #2c3e50;">Confirm Your Email</h2>
      <p>Hi there,</p>
      <p>Thank you for signing up! Please confirm your email address by clicking the button below:</p>
      <a href="${confirmLink}" style="display: inline-block; padding: 12px 20px; margin-top: 15px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 5px;">Confirm Email</a>
      <p style="margin-top: 30px;">If the button doesn't work, copy and paste this link into your browser:</p>
      <p style="word-break: break-all;"><a href="${confirmLink}" style="color: #3498db;">${confirmLink}</a></p>
      <hr style="margin-top: 40px;" />
      <p style="font-size: 12px; color: #aaa;">If you didn’t request this, you can safely ignore this email.</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Praksh Classes" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Confirm your email",
    html,
  });
};

// 🔑 Send password reset email
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${BASE_URL}/auth/new-password?token=${token}`;

  const html = `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
      <h2 style="color: #e67e22;">Reset Your Password</h2>
      <p>Hello,</p>
      <p>You requested a password reset. Click the button below to create a new one:</p>
      <a href="${resetLink}" style="display: inline-block; padding: 12px 20px; margin-top: 15px; background-color: #e67e22; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
      <p style="margin-top: 30px;">Or copy and paste this link in your browser:</p>
      <p style="word-break: break-all;"><a href="${resetLink}" style="color: #3498db;">${resetLink}</a></p>
      <hr style="margin-top: 40px;" />
      <p style="font-size: 12px; color: #aaa;">If you didn’t request this, please ignore this email.</p>
    </div>
  `;

  await transporter.sendMail({
    from: `"Prakash Classes" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Reset your password",
    html,
  });
};

// 📩 Send class code (plain)
export const sendClassCode = async (email: string, code: string) => {
  const html = `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
      <h2>Your Class Code</h2>
      <p>Here's your generated class code:</p>
      <pre style="font-size: 20px; background: #f6f8fa; padding: 10px; border-radius: 6px; display: inline-block;">${code}</pre>
    </div>
  `;

  await transporter.sendMail({
    from: `"Praksh Classes" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your class code for the new generated Class",
    html,
  });
};
