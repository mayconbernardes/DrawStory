import { GoogleGenAI, Type } from "@google/genai";
import { Language } from '../types';
import { translations } from "../translations";

// For Netlify, the variable is prefixed with VITE_. For local dev, it might be just API_KEY.
// This line checks for the VITE_ prefixed one first, and falls back to the other if it's not found.
const API_KEY = process.env.VITE_API_KEY || process.env.API_KEY;

if (!API_KEY) {
  // This error will trigger if neither VITE_API_KEY nor API_KEY is set.
  throw new Error("VITE_API_KEY or API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        description: {
            type: Type.STRING,
            description: "A short, objective description of what is in the drawing."
        },
        story: {
            type: Type.STRING,
            description: "A longer, imaginative story based on the drawing."
        },
    },
    required: ['description', 'story'],
};

export async function generateStoryFromImage(
  base64Image: string, 
  language: Language,
  t: (key: keyof typeof translations.en) => string
): Promise<{ description: string; story: string }> {
  try {
    const imagePart = {
      inlineData: {
        mimeType: 'image/png',
        data: base64Image,
      },
    };
    
    const textPart = {
      text: t('geminiPrompt'),
    };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: { parts: [imagePart, textPart] },
      config: {
        systemInstruction: t('geminiSystemInstruction'),
        temperature: 0.8,
        topP: 0.9,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      }
    });

    const parsedResponse = JSON.parse(response.text);
    return parsedResponse;

  } catch (error) {
    console.error("Error generating story from Gemini API:", error);
    throw new Error(t('geminiError'));
  }
}