import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '~/server/api/trpc';
import { blogIdPayloadSchema, blogPayloadSchema } from './blog.schema';

export const blogRouter = createTRPCRouter({
  create: protectedProcedure
    .input(blogPayloadSchema)
    .query(async ({ ctx, input }) => {
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

  getBlog: publicProcedure
    .input(blogIdPayloadSchema)
    .query(({ input, ctx }) => {
      return ctx.prisma.blog.findUnique({
        where: {
          id: input.blogId,
        },
      });
    }),

  delete: protectedProcedure
    .input(blogIdPayloadSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.blog.delete({
          where: {
            id: input.blogId,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.blog.findMany();
  }),
});
