import { GoogleGenAI } from "@google/genai";
import { GEMINI_MODEL } from '../constants';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const askAiTutor = async (question: string, context?: string): Promise<string> => {
  if (!apiKey) {
    return "API Key is missing. Please configure the environment variable.";
  }

  try {
    const prompt = `
      You are an expert A-Level Physics Tutor specializing in Mechanics and Circular Motion.
      
      User Context: ${context || 'General physics question'}
      Student Question: "${question}"

      Please provide a concise, encouraging answer. 
      - Use LaTeX formatting for math where possible (e.g., $v = \\sqrt{gr}$).
      - Focus on the concepts of conservation of energy, centripetal force, and Newton's laws.
      - If the student made a mistake, explain why gently.
      - Keep the response under 150 words unless asked for a detailed derivation.
    `;

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
    });

    return response.text || "I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I encountered an error connecting to the AI Tutor.";
  }
};
