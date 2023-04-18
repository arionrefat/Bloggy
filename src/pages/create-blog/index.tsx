import React, { useState } from 'react';
import { TextField, Box, Stack, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';

const CreateProject = () => {
  const router = useRouter();

  return (
    <Stack className='flex items-center justify-center' gap={5}>
      <Typography variant='h5'>Create a Blog</Typography>
      <TextField
        id='title-blog'
        autoFocus
        label='Title'
        variant='standard'
        className='w-1/3'
        onChange={(e) => {}}
      />
      <TextField
        id='blog-image'
        autoFocus
        label='Image'
        variant='standard'
        className='w-1/3'
        onChange={(e) => {

        }}
      />
      <TextField
        id='description-blog'
        autoFocus
        label='Description'
        variant='filled'
        multiline
        rows={2}
        className='w-1/3'
        onChange={(e) => {

        }}
      />
      <Button variant='outlined'>Submit</Button>
    </Stack>
  );
};

export default CreateProject;
