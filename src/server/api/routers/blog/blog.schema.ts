import { z } from 'zod';

export const blogPayloadSchema = z.object({
  title: z.string().max(255),
  description: z.string().max(255),
  content: z.string().max(3000),
  tags: z.array(z.string()),
  image: z.string().nullable().optional(),
  visibility: z.enum(['public', 'private']),
}).strict();
