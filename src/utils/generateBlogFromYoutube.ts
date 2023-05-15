import { YoutubeTranscript } from 'youtube-transcript';
import cgptRequest from './cgpt';
import { ChatMessage } from 'chatgpt';

interface TranscriptData {
  text: string;
  duration: number;
  offset: number;
}

function concatenateYoutubeTranscription(data: TranscriptData[]): string {
  return data.reduce((acc, curr) => acc + curr.text + ' ', '');
}

async function fetchTranscripts(url: string): Promise<string> {
  const transcriptionData = await YoutubeTranscript.fetchTranscript(url);
  return concatenateYoutubeTranscription(transcriptionData);
}

export async function generateBlogFromYoutube(url: string): Promise<string> {
  const script = await fetchTranscripts(url);
  const cgptRequestedBlog = await cgptRequest({
    message: `${script} Suppose, you are an article writer and you only outputs in  markdown format. The above paragraph is a youtube video transcript. Now make a small article based on the above transcript.`,
  });
  return cgptRequestedBlog.text;
}
