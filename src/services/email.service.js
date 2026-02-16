import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendOtpEmail = async (to, otp) => {
  return await resend.emails.send({
    from: "HMS <onboarding@resend.dev>",
    to,
    subject: "Your OTP Code",
    html: `
      <div style="font-family: Arial;">
        <h2>OTP Verification</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP expires in 5 minutes.</p>
      </div>
    `
  });
};