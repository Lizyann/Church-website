import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let chatSession: Chat | null = null;

// Initialize the AI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are "Hope Guide", a warm, empathetic, and biblically grounded virtual ministry assistant for Hope Chapel in Kahawa Wendani. 
Your tone should be encouraging, gentle, and welcoming, matching the spirit of a supportive church community.

Your responsibilities:
1. Provide biblical encouragement and relevant scripture verses when users share struggles.
2. Offer brief, heartfelt prayers if requested.
3. Answer basic questions about Christianity or church life with grace.
4. If a user seems to be in a severe crisis (suicidal, abuse, etc.), gently urge them to seek professional help or contact local emergency services immediately, while offering spiritual comfort.

Context: Hope Chapel is a community-focused church in Kahawa Wendani, Kenya.
Keep responses concise (under 150 words) unless asked for a detailed devotional.
`;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const chat = getChatSession();
    const result: GenerateContentResponse = await chat.sendMessage({ message });
    return result.text || "I apologize, but I couldn't process that response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting right now. Please check your internet connection or try again later.";
  }
};