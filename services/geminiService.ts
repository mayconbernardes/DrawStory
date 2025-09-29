import { GoogleGenAI, Type } from "@google/genai";
import { Language } from '../types';
import { translations } from "../translations";

// Fix: Use process.env.API_KEY as per the @google/genai guidelines for API key management.
// This also resolves the TypeScript error related to `import.meta.env`.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
