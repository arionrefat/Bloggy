import { Formik } from 'formik';
import { TextField, Stack, Typography, Button } from '@mui/material';
import { api } from '~/utils/api';
import { blogPayloadSchema } from '~/server/api/routers/blog/blog.schema';
import { z } from 'zod';

const CreateProject = () => {
  type blogTypes = z.infer<typeof blogPayloadSchema>;

  const initialBlogsValues: blogTypes = {
    title: '',
    description: '',
    content: '',
    tags: [],
    visibility: 'public',
    image: '',
  };

  const { mutateAsync, isLoading } = api.blog.create.useMutation();

  if (isLoading) {
    return <h1>Loading </h1>;
  }

  return (
    <Stack className='flex flex-col items-center justify-center'>
      <Typography variant='h5'>Create a Blog</Typography>
      <Formik
        initialValues={initialBlogsValues}
        onSubmit={(values, actions) => {
          try {
            mutateAsync(values);
            actions.setSubmitting(false);
          } catch (error) {
            console.error('Error creating blog:', error);
          }
        }}
      >
        {({ handleSubmit, handleBlur, handleChange, values }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              id='title-blog'
              name='title'
              autoFocus
              label='Title'
              variant='standard'
              className='w-1/3'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
            />
            <TextField
              id='blog-image'
              name='image'
              label='Image'
              variant='standard'
              className='w-1/3'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.image}
            />
            <TextField
              id='description-blog'
              name='description'
              label='Description'
              variant='filled'
              multiline
              rows={2}
              className='w-1/3'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
            />
            <TextField
              id='Content'
              name='content'
              label='Content'
              variant='filled'
              multiline
              rows={2}
              className='w-1/3'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.content}
            />
            <Button type='submit' variant='outlined'>
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </Stack>
  );
};

export default CreateProject;
