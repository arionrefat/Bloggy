import { api } from '~/utils/api';
import BlogCard from '../components/BlogCard';
import Grid from '@mui/material/Grid';
import { useSession } from 'next-auth/react';

export default function blogs() {
  const { data: sessionData } = useSession();

  let allBlogs;

  if (sessionData) {
    allBlogs = api.blog.getAll.useQuery().data;
  } else {
    allBlogs = api.blog.getAllPublic.useQuery().data;
  }

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
