import { z } from 'zod';

export const blogPayloadSchema = z
  .object({
    title: z
      .string({
        required_error: 'Need title',
      })
      .max(255),
    description: z
      .string({
        required_error: 'Need description',
      })
      .max(255),
    content: z
      .string({
        required_error: 'Need content',
      })
      .max(3000),
    tags: z.array(z.string()).optional(),
    image: z.string().nullable().optional(),
    visibility: z.enum(['public', 'private']),
  })
  .strict();

export const blogUpdatePayloadSchema = z
  .object({
    blogId: z.string().cuid2(),
    title: z
      .string({
        required_error: 'Please enter your title first',
      })
      .max(255)
      .optional(),
    description: z
      .string({
        required_error: 'Please enter description here',
      })
      .max(255)
      .optional(),
    content: z
      .string({
        required_error: 'Please enter Content here',
      })
      .max(3000)
      .optional(),
    tags: z.array(z.string()).optional(),
    image: z.string().nullable().optional(),
    visibility: z.enum(['public', 'private']).optional(),
  })
  .strict();

export const blogIdSchema = z
  .object({
    blogId: z.string().cuid2(),
  })
  .strict();

export const commentSchema = z
  .object({
    blogId: z.string().cuid2(),
    comment: z
      .string({
        required_error: 'Comment is Required',
      })
      .max(600)
  })
  .strict();
