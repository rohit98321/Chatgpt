const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

const generateAiResponse = async (content) => {
  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: content,
    config:{
      temperature:0.2,
      systemInstruction:`You are a helpful AI assistant. 
      Use the following context to answer:
      - Short-Term Memory: last 5 user + AI messages.
      - Long-Term Memory: relevant messages from vector DB.
      - If memory is empty, answer naturally without hallucinating.
      - Always be concise, accurate, and helpful.`
    }
  });

  return result.candidates[0].content.parts[0].text
};

const generateVector = async (content) => {
  const response = await ai.models.embedContent({
    model: "gemini-embedding-001",
    contents: content,
    config:{
      outputDimensionality:768  
    }
  });

  return response.embeddings[0].values
};

module.exports = {generateAiResponse,generateVector};
