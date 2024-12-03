import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/utils/emailSender";
import { diagnosisEmailTemplate } from "@/templates/emailTemplate";

export async function POST(req: NextRequest) {
  try {
    const { email, diagnosisResult } = await req.json();

    if (!email || !diagnosisResult) {
      return NextResponse.json(
        { message: "이메일 또는 진단 결과가 누락되었습니다." },
        { status: 400 }
      );
    }

    const emailContent = diagnosisEmailTemplate(diagnosisResult);

    await sendEmail(email, "Your Diagnosis Result", emailContent);

    return NextResponse.json({ message: "이메일 전송 성공" });
  } catch (error) {
    console.error("이메일 전송 실패:", error);
    return NextResponse.json(
      { message: "이메일 전송 실패", error: String(error) },
      { status: 500 }
    );
  }
}
