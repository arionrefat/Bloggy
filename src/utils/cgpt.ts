import axios, { AxiosResponse } from 'axios';

interface ChatGPTRequestPayload {
  prompt: string;
  max_tokens?: number;
  n?: number;
  stop?: string | string[];
  temperature?: number;
}

interface ChatGPTResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    text: string;
    index: number;
    logprobs: any;
    finish_reason: string;
  }[];
}

const API_KEY = 'your_openai_api_key';
const API_ENDPOINT =
  'https://api.openai.com/v1/engines/davinci-codex/completions';

async function getChatGPTResponse(prompt: string): Promise<void> {
  const requestPayload: ChatGPTRequestPayload = {
    prompt,
    max_tokens: 50,
    n: 1,
    stop: undefined,
    temperature: 1,
  };

  try {
    const response: AxiosResponse<ChatGPTResponse> = await axios.post(
      API_ENDPOINT,
      requestPayload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const chatGPTResponse = response.data.choices[0]!.text;
    console.log(`ChatGPT Response: ${chatGPTResponse}`);
  } catch (error: any) {
    console.error('Error making request to ChatGPT API:', error.message);
  }
}

getChatGPTResponse('What is the capital of France?');
