import { NextRequest, NextResponse } from "next/server";
import client, { getAssistantAndThreadIds } from "@/utils/assistant";

interface ContentBlock {
  type: string;
  text?: { value: string };
}

/**
 * POST 요청 핸들러
 */
export async function POST(req: NextRequest) {
  try {
    const { assistantId, threadId } = getAssistantAndThreadIds();
    const { traumaType, locations, painLevel, additionalInfo } = await req.json();

    if (!traumaType || !locations || !painLevel) {
      return NextResponse.json(
        { message: "필수 데이터가 누락되었습니다." },
        { status: 400 }
      );
    }

    let userMessage = `The patient reports trauma type: "${traumaType}" at locations: ${locations.join(
      ", "
    )}. Pain level: ${painLevel}.`;

    if (additionalInfo) {
      userMessage += ` Additional details provided by the patient: "${additionalInfo}".`;
    }

    userMessage += ` Please provide a diagnosis and treatment plan. Please answer in Korean.`;

    await client.beta.threads.messages.create(threadId, {
      role: "user",
      content: userMessage,
    });

    const run = await client.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
    });

    let resultMessage = null;
    for (let i = 0; i < 10; i++) {
      const runStatus = await client.beta.threads.runs.retrieve(
        threadId,
        run.id
      );
      if (runStatus.status === "completed") {
        const messages = await client.beta.threads.messages.list(threadId);
        resultMessage = messages.data.find((msg) => msg.role === "assistant");
        break;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    if (!resultMessage || !resultMessage.content) {
      return NextResponse.json(
        { message: "결과를 가져오지 못했습니다." },
        { status: 500 }
      );
    }

    let diagnosisResult = "";

    if (Array.isArray(resultMessage.content)) {
      diagnosisResult = (resultMessage.content as ContentBlock[])
        .filter((item) => item.type === "text" && item.text?.value)
        .map((item) => item.text!.value)
        .join("\n");
    } else if (typeof resultMessage.content === "string") {
      diagnosisResult = resultMessage.content;
    } else {
      diagnosisResult = "유효한 텍스트 결과를 찾을 수 없습니다.";
    }

    if (!diagnosisResult) {
      return NextResponse.json(
        { message: "유효한 진단 결과를 찾을 수 없습니다." },
        { status: 500 }
      );
    }

    console.log("diagnosisResult: ", diagnosisResult);

    return NextResponse.json({
      message: "진단 완료",
      data: { diagnosis: diagnosisResult },
    });
  } catch (error) {
    console.error("에러 발생:", error);
    return NextResponse.json(
      { message: "처리 중 문제가 발생했습니다.", error: String(error) },
      { status: 500 }
    );
  }
}
