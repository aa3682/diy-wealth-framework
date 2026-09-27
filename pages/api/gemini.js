import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;
    
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-3.1-pro-preview',
      systemInstruction: 'You are an expert CFP® professional assisting a self-directed investor. Provide concise, mathematically sound, and objective financial planning guidance. Focus on actionable frameworks and mechanical rules. Do not use generic chatbot filler.'
    }); 
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to generate financial modeling context' });
  }
}
