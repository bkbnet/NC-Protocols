
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { NoteFile, ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const askNoteSageStream = async function* (
  question: string,
  relevantDocs: NoteFile[],
  history: ChatMessage[]
) {
  const chatContext = history.slice(-10).map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.text }]
  }));

  // We use gemini-3-pro-preview for advanced grounding and reasoning over the protocols
  const systemPrompt = `
    IDENTITY: 
    You are NoteSage, a specialized Academic Assistant. You possess deep knowledge of the North Carolina OEMS EMS Protocols.

    CORE KNOWLEDGE BASE:
    ${relevantDocs.map(doc => `--- START DOCUMENT: ${doc.name} ---\n${doc.content}\n--- END DOCUMENT ---`).join('\n\n')}

    STRICT CONSTRAINTS:
    1. Answer ONLY using the provided documents. 
    2. If a question cannot be answered using ONLY these documents, state: "I'm sorry, that specific information is not covered in our current class protocols."
    3. CITATION RULE: At the end of your response, always explicitly mention which protocol you referenced (e.g., "Referenced: UP 15"). This allows the UI to link to the source document.
    4. Tone: Professional, academic, and clinical.
    5. Do not hallucinate outside medical knowledge. If the protocol says 4 hours, and you think general knowledge says 6, you MUST say 4 hours.
  `;

  const responseStream = await ai.models.generateContentStream({
    model: 'gemini-3-pro-preview',
    contents: [
      ...chatContext,
      {
        role: 'user',
        parts: [{ text: question }]
      }
    ],
    config: {
      systemInstruction: systemPrompt,
      temperature: 0.1, // Near zero to minimize creative license and maximize accuracy
    }
  });

  for await (const chunk of responseStream) {
    const text = chunk.text;
    if (text) yield text;
  }
};
