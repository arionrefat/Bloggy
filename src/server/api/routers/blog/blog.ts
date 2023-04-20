import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from '~/server/api/trpc';
import {
  blogIdSchema,
  blogUpdatePayloadSchema,
  blogPayloadSchema,
  commentSchema,
} from './blog.schema';

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

  update: protectedProcedure
    .input(blogUpdatePayloadSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.blog.update({
          where: {
            id: input.blogId,
          },
          data: {
            ...input,
            updatedBy: ctx.session?.user.id,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }),

  getBlog: publicProcedure.input(blogIdSchema).query(({ input, ctx }) => {
    return ctx.prisma.blog.findUnique({
      where: {
        id: input.blogId,
      },
    });
  }),

  delete: protectedProcedure
    .input(blogIdSchema)
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

  getAllPublic: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.blog.findMany({
      where: {
        visibility: 'public',
      },
    });
  }),

  like: protectedProcedure
    .input(blogIdSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        await ctx.prisma.likes.create({
          data: {
            ...input,
            userId: ctx.session.user.id,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }),

  comment: protectedProcedure
    .input(commentSchema)
    .query(async ({ input, ctx }) => {
      try {
        await ctx.prisma.comment.create({
          data: {
            ...input,
            content: input.comment,
            userId: ctx.session.user.id,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }),
});
