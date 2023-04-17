import { useRouter } from 'next/router';
import { api } from '~/utils/api';
import RenderBlog from '../blogs/RenderBlog';

export default function BlogPage() {
  const router = useRouter();
  const blogId = router.query.blogId as string;

  const { data, isLoading, isSuccess } = api.blog.getBlog.useQuery({ blogId });

  if (isLoading) {
    return <h1> loading </h1>;
  }

  return isSuccess && data && <RenderBlog file={data?.content} />;
}
