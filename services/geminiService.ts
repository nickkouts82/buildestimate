
import { GoogleGenAI } from "@google/genai";
import { Professional } from "../types";

/**
 * Safely retrieve the API key from the environment.
 * Supports both standard process.env and Vite's import.meta.env.
 */
const getApiKey = () => {
  // Check for Vite environment variables (used in production builds)
  const viteKey = (import.meta as any).env?.VITE_API_KEY;
  if (viteKey) return viteKey;

  // Fallback to process.env (used in local development/this editor)
  try {
    return (window as any).process?.env?.API_KEY || (typeof process !== 'undefined' ? process.env.API_KEY : '');
  } catch (e) {
    return '';
  }
};

export const getProSummary = async (pro: Professional) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    return "This professional has a stellar track record with verified expertise in their field.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a helpful assistant for Home Pathway, a property professional marketplace. 
      Summarize why this professional is a great choice for a homeowner. 
      Professional Details: 
      Name: ${pro.name}
      Title: ${pro.title}
      Location: ${pro.location}
      Performance: ${pro.performance.map(p => `${p.label}: ${p.value}`).join(', ')}
      About: ${pro.about}
      
      Keep it brief, encouraging, and under 60 words.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Summary Error:", error);
    return "This professional is highly rated for their accuracy and customer service.";
  }
};

export const chatWithAssistant = async (query: string, pros: Professional[]) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    return "I'm currently in search mode. Based on our data, ABCD Conveyancing is highly recommended for Melbourne-based property settlements.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User is looking for property professionals. Help them based on our current list: ${JSON.stringify(pros.map(p => ({name: p.name, title: p.title, score: p.score})))}.
      User query: "${query}"
      Provide a helpful, friendly response. If they are asking for a specific professional, mention them.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm having trouble connecting to my brain right now, but I'd recommend looking at ABCD Conveyancing for their high accuracy rate!";
  }
};
