import * as React from 'react';
import Card from '@mui/material/Card';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import Link from 'next/link';
import { api } from '~/utils/api';

interface CardsProps {
  id: string;
  title: string;
  description: string;
  image: string | null;
}

export default function BlogCard({
  title,
  description,
  image,
  id,
}: CardsProps) {
  const { mutateAsync } = api.blog.delete.useMutation();

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link href={`/blog/${id}`} passHref>
        <CardActionArea>
          <CardMedia
            component='img'
            height='150'
            image={image ? image : 'no_data.png'}
            alt='blog image'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              {title}
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <Button onClick={() => mutateAsync({ blogId: id })}>
        <DeleteOutlinedIcon />
      </Button>
    </Card>
  );
}
