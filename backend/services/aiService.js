import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

const tryGenerate = async (model, prompt) => {
  const response = await ai.models.generateContent({
    model,
    contents: prompt
  });
  return response.text;
};

const analyzeResumeWithAI = async (prompt) => {
  try {
    // First try fast latest model
    return await tryGenerate("gemini-2.5-flash", prompt);

  } catch (err) {
    console.warn("Primary model failed, switching fallback...", err.status);

    // Fallback to stable model
    try {
      return await tryGenerate("gemini-1.5-flash", prompt);
    } catch (finalErr) {
      console.error("Gemini AI Error:", finalErr);
      throw new Error("AI service temporarily unavailable");
    }
  }
};

export { analyzeResumeWithAI };