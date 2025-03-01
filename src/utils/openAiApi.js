import { OpenAI } from "openai";
import { OpenApiKey } from "./constants";

const openai = new OpenAI({
  baseUrl: "https://openrouter.ai/api/v1",
  apiKey: OpenApiKey,
});

export const getChatCompletion = async (message) => {
  const completion = await openai.chat.completions.create({
    model: "deepseek/deepseek-r1:free",
    messages: [{ role: "user", content: message }],
  });

  return completion.choices[0].message.content;
};
