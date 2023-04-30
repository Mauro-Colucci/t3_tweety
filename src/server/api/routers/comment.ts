import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const commentRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ body: z.string(), postId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const comment = await ctx.prisma.comment.create({
        data: {
          body: input.body,
          userId: ctx.session.user.id,
          postId: input.postId,
        },
      });

      const post = await ctx.prisma.post.findUnique({
        where: {
          id: input.postId,
        },
      });

      if (post?.userId) {
        await ctx.prisma.notification.create({
          data: {
            body: "Someone replied to your post!",
            userId: post.userId,
          },
        });

        await ctx.prisma.user.update({
          where: {
            id: post.userId,
          },
          data: {
            hasNotification: true,
          },
        });
      }

      return comment;
    }),
});
