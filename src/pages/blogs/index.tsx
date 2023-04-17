import RenderBlog from './RenderBlog';
import { api } from '~/utils/api';

export default function blogs() {
  const allBlogs = api.blog.getAll.useQuery().data;

  console.log(allBlogs)

  return (
    <>
      {allBlogs ? (
        allBlogs.map((blog) => {
          <RenderBlog file={blog.content} />;
        })
      ) : (
        <h1> No blogs </h1>
      )}
    </>
  );
}
