import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function RenderBlog({file}:{file: string}) {
  return <ReactMarkdown children={file} remarkPlugins={[remarkGfm]} />;
}

export default RenderBlog;
