import { ChatGPTAPI } from 'chatgpt';
import { env } from '~/env.mjs';

interface cgptParams {
  message: string;
  completionParams?: {
    model: string;
    temperature: number;
    top_p: number;
  };
}

async function cgptRequest(params: cgptParams) {
  const api = new ChatGPTAPI({
    apiKey: env.OPENAI_API_KEY,
    completionParams: {
      model: params.completionParams?.model,
      temperature: params.completionParams?.temperature,
      top_p: params.completionParams?.top_p,
    },
  });

  return await api.sendMessage(params.message);
}

export default cgptRequest;
