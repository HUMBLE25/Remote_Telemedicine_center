import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, htmlContent: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // 발신 이메일 주소
      pass: process.env.EMAIL_PASS, // 앱 비밀번호 또는 SMTP 인증 비밀번호
    },
  });

  await transporter.sendMail({
    from: `"RTC" <${process.env.EMAIL_USER}>`, // 발신자 정보
    to,
    subject,
    html: htmlContent, // 이메일 내용 (HTML)
  });
};
