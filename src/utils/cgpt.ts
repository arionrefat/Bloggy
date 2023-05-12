import { ChatGPTAPI } from 'chatgpt';
import { env } from '~/env.mjs';

interface cgptParams {
  message: string;
}

async function cgptRequest(params: cgptParams) {
  const api = new ChatGPTAPI({
    apiKey: env.OPENAI_API_KEY,
  });

  return await api.sendMessage(params.message);
}
