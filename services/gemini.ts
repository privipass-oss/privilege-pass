import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not defined');
}

const genAI = new GoogleGenerativeAI(apiKey);

export interface UserProfile {
  name: string;
  preferences: string[];
  budget: number;
  travelFrequency: string;
}

export interface AIRecommendation {
  loungeId: string;
  name: string;
  benefits: string[];
  rating: number;
  reason: string;
}

export async function generateAIRecommendation(userProfile: UserProfile): Promise<AIRecommendation> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Based on the following user profile, recommend a VIP lounge experience:

User: ${userProfile.name}
Preferences: ${userProfile.preferences.join(', ')}
Budget: $${userProfile.budget}
Travel Frequency: ${userProfile.travelFrequency}

Provide a recommendation in JSON format with: loungeId, name, benefits (array), rating (1-5), and reason.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Parse the JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse AI response');
    }

    const recommendation: AIRecommendation = JSON.parse(jsonMatch[0]);
    return recommendation;
  } catch (error) {
    console.error('Error generating AI recommendation:', error);
    throw error;
  }
}

export async function generateLoungeSummary(loungeData: Record<string, any>): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `Create an engaging summary for this VIP lounge:
${JSON.stringify(loungeData, null, 2)}

Make it concise, highlight key benefits, and include why travelers should visit.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error generating lounge summary:', error);
    throw error;
  }
}

export async function answerUserQuestion(question: string, context: string = ''): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = context
      ? `Answer the following question about VIP lounge services:\n\nContext: ${context}\n\nQuestion: ${question}`
      : `Answer the following question about VIP lounge services:\n\nQuestion: ${question}`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error('Error answering question:', error);
    throw error;
  }
}
