import React from 'react';
import { useFormik } from 'formik'
import { withZodSchema } from 'formik-validator-zod'
import { TextField, Stack, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { blogPayloadSchema } from '~/server/api/routers/blog/blog.schema';
import { z } from 'zod';
import { api } from '~/utils/api';

const CreateProject = () => {
  const router = useRouter();

  type BlogTypes = z.infer<typeof blogPayloadSchema>;

  const initialValues: BlogTypes = {
    title: '',
    description: '',
    content: '',
    tags: [],
    image: null,
    visibility: 'public',
  };

  const formik = useFormik({
    initialValues,
    validationSchema: withZodSchema(blogPayloadSchema),
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: true,
    onSubmit: (values) => {
      api.blog.create.useQuery(values);
    },
  });

  const { values, handleBlur, handleChange, isSubmitting } = formik;

  return (
    <Stack className='flex items-center justify-center' gap={5}>
      <Typography variant='h5'>Create a Blog</Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id='title-blog'
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
          autoFocus
          label='Image'
          variant='standard'
          value={values.image}
          className='w-1/3'
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <TextField
          id='description-blog'
          autoFocus
          label='Description'
          variant='filled'
          multiline
          rows={2}
          className='w-1/3'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.description}
        />
        <Button type='submit' disabled={isSubmitting} variant='outlined'>
          Submit
        </Button>
      </form>
    </Stack>
  );
};

export default CreateProject;
