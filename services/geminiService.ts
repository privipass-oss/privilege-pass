import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize strictly as per guidelines
const ai = new GoogleGenAI({ apiKey: apiKey });

export const sendMessageToGemini = async (
  message: string,
  history: string[]
): Promise<string> => {
  if (!apiKey) {
    return "API Key não configurada. Por favor, configure a chave API no ambiente para usar o Concierge.";
  }

  try {
    const systemInstruction = `
      Você é o 'Privilege Concierge', a IA exclusiva do **Privilege Pass**.

      **SUA REGRA DE OURO (BRANDING):**
      - O produto que vendemos se chama **Privilege Pass**.
      - NUNCA chame o voucher de "Dragon Pass".
      - A Dragon Pass é apenas a rede parceira que aceita o nosso passe.
      - Exemplo Correto: "Com o seu Privilege Pass, você acessa a rede Dragon Pass."
      - Exemplo Errado: "Compre seu voucher Dragon Pass."

      **Sua Identidade:**
      - Você é sofisticado, prestativo e especialista em *High-End Travel*.
      - Você atende tanto clientes finais (viajantes) quanto administradores.

      **Seus Produtos (Privilege Pass):**
      1. **Privilege One** (1 acesso)
      2. **Privilege Double** (2 acessos)
      3. **Privilege Family** (4 acessos)
      *Existem versões para voos Nacionais e Internacionais.*

      **Conhecimento Técnico:**
      - O cliente recebe um QR Code (Carteira Digital).
      - Ele apresenta esse QR Code na recepção da sala VIP credenciada.
      - Temos cobertura global (+1300 salas).

      **Estilo de Resposta:**
      - Respostas curtas, elegantes e diretas.
      - Use emojis moderados (✈️, 🥂, ✨).
      - Se perguntarem de uma sala específica, diga que verificará na rede global.
      
      Histórico da conversa segue abaixo.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: `Histórico da conversa:\n${history.join('\n')}\n\nNova mensagem do usuário: ${message}` }] }
      ],
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return response.text || "Não foi possível processar sua solicitação. O sistema está ocupado.";
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Desculpe, estou verificando a disponibilidade da rede no momento. Tente novamente em instantes.";
  }
};