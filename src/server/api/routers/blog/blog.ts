import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '~/server/api/trpc';
import { blogPayloadSchema } from './blog.schema';
import { z } from 'zod';

export const blogRouter = createTRPCRouter({
  create: protectedProcedure
    .input(blogPayloadSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.blog.create({
          data: {
            ...input,
            createdBy: ctx.session?.user.id,
            updatedBy: ctx.session?.user.id,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.blog.delete({
          where: {
            id: input.id
          },
        });
      } catch (err) {
        console.log(err);
      }
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.blog.findMany();
  })
});
