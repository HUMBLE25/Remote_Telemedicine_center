import { OpenAI } from "openai";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Assistant ID와 Thread ID를 반환하는 함수
 */
export function getAssistantAndThreadIds() {
  return {
    assistantId: process.env.OPENAI_ASSISTANT_ID || "",
    threadId: process.env.OPENAI_THREAD_ID || "",
  };
}

export default client;
