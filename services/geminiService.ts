
import { GoogleGenAI, Type } from "@google/genai";

// Always create a fresh instance to ensure the latest API key is used
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateVideoIdea = async (mood: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a creative cyberpunk-themed video idea for a social media app. The mood is ${mood}. Provide a title and a short script/description.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            idea: { type: Type.STRING }
          },
          required: ["title", "idea"]
        }
      }
    });
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Error:", error);
    return { title: "Neon Night Walk", idea: "Film a walk through a rainy neon street with high-contrast editing." };
  }
};

export const searchTrends = async (query: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Search for trending topics related to: ${query}. Focus on pop culture, tech, and cyberpunk aesthetics.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    
    // Extracting URLs from grounding chunks as per instructions
    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    return {
      text: response.text,
      sources: sources
    };
  } catch (error) {
    console.error("Search Error:", error);
    return { text: "No results found for your holographic search.", sources: [] };
  }
};

export const generateBio = async (interests: string) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Create a short, cool, cyberpunk-themed bio for a creator who likes ${interests}. Max 2 sentences.`,
    });
    return response.text?.trim() || "Visual architect of the digital age.";
  } catch (error) {
    return "Creating digital vibes in a neon world ⚡️";
  }
};
