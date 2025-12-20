
import { GoogleGenAI } from "@google/genai";
import { Professional } from "../types";

export const getProSummary = async (pro: Professional) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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
    return "This professional has a stellar track record with verified expertise in their field.";
  }
};

export const chatWithAssistant = async (query: string, pros: Professional[]) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `User is looking for property professionals. Help them based on our current list: ${JSON.stringify(pros.map(p => ({name: p.name, title: p.title, score: p.score})))}.
      User query: "${query}"
      Provide a helpful, friendly response. If they are asking for a specific professional, mention them.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return "I'm currently in search mode. Based on our data, ABCD Conveyancing is highly recommended for property settlements.";
  }
};
