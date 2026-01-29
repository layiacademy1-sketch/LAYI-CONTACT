
import { GoogleGenAI } from "@google/genai";

// Fixed: Correctly initialize GoogleGenAI using process.env.API_KEY directly as a named parameter
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const enhancePresentation = async (name: string, category: string, details: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Améliore cette présentation professionnelle pour un profil Snapchat. Le nom est ${name}, la catégorie est ${category}. 
      Détails fournis: ${details}. Rédige un texte court, accrocheur et professionnel en français (max 200 caractères).`,
    });
    // Fixed: Accessed text output using the .text property directly instead of a method call
    return response.text?.trim() || details;
  } catch (error) {
    console.error("Gemini Error:", error);
    return details;
  }
};
