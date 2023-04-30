import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ body: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.create({
        data: {
          body: input.body,
          userId: ctx.session.user.id,
        },
      });
      return post;
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      include: {
        user: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return posts;
  }),
  getById: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.prisma.post.findUnique({
        where: {
          id: input.postId,
        },
        include: {
          user: true,
          comments: {
            include: {
              user: true,
            },
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });
      return post;
    }),
  getByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const posts = await ctx.prisma.post.findMany({
        where: {
          userId: input.userId,
        },
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return posts;
    }),
  getTest: publicProcedure
    .input(z.object({ userId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const { userId } = input;
      const where = userId ? { userId } : {};
      const posts = await ctx.prisma.post.findMany({
        where,
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return posts;
    }),
  like: protectedProcedure
    .input(z.object({ postId: z.string() }))
    .mutation(async ({ ctx, input: { postId } }) => {
      const { id } = ctx.session.user;
      const post = await ctx.prisma.post.findUnique({
        where: {
          id: postId,
        },
      });
      if (!post) throw new TRPCError({ code: "NOT_FOUND" });

      let updatedLikedIds = [...post.likedIds];

      if (updatedLikedIds.includes(id)) {
        updatedLikedIds = updatedLikedIds.filter((likedIds) => likedIds !== id);
      } else {
        updatedLikedIds.push(id);
      }

      const updatedPost = await ctx.prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          likedIds: updatedLikedIds,
        },
      });

      return updatedPost;
    }),
});
