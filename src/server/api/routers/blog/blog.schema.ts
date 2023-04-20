import { z } from 'zod';

export const blogPayloadSchema = z
  .object({
    title: z
      .string({
        required_error: 'Please enter your title first',
      })
      .max(255),
    description: z
      .string({
        required_error: 'Please enter description here',
      })
      .max(255),
    content: z
      .string({
        required_error: 'Please enter Content here',
      })
      .max(3000),
    tags: z.array(z.string()),
    image: z.string().nullable().optional(),
    visibility: z.enum(['public', 'private']),
  })
  .strict();

export const blogIdPayloadSchema = z
  .object({
    blogId: z.string().cuid2(),
  })
  .strict();
