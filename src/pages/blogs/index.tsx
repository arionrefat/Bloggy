import { api } from '~/utils/api';
import BlogCard from '../components/BlogCard';
import Grid from '@mui/material/Grid';

export default function blogs() {
  const allBlogs = api.blog.getAll.useQuery().data;

  return (
    <Grid container spacing={4} className='px-5'>
      {allBlogs ? (
        allBlogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id}>
            <BlogCard
              title={blog.title}
              description={blog.description}
              image={blog.image}
              id={blog.id}
            />
          </Grid>
        ))
      ) : (
        <h1> No blogs </h1>
      )}
    </Grid>
  );
}
