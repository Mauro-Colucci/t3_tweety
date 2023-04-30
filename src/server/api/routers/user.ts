import { TRPCError } from "@trpc/server";
import { z } from "zod";
import bcrypt from "bcrypt";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  createAccount: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        username: z.string().min(3).max(12),
        name: z.string(),
        password: z
          .string()
          .min(6, { message: "Password must be at least 6 characters." }),
      })
    )
    .mutation(async ({ ctx, input: { email, name, password, username } }) => {
      const userExist = await ctx.prisma.user.findFirst({
        where: {
          OR: [
            {
              email,
              username,
            },
          ],
        },
      });
      if (userExist)
        throw new TRPCError({
          code: "CONFLICT",
          message: "email or username already in use.",
        });
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await ctx.prisma.user.create({
        data: {
          email,
          name,
          hashedPassword,
          username,
        },
      });
      return user;
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return users;
  }),
  getById: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.userId,
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
          username: true,
          bio: true,
          followingIds: true,
          coverImage: true,
          profileImage: true,
        },
      });
      const followersCount = await ctx.prisma.user.count({
        where: {
          followingIds: {
            has: input.userId,
          },
        },
      });
      return { ...user, followersCount };
    }),
  getCurrent: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    return user;
  }),
  edit: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        username: z.string(),
        bio: z.string(),
        profileImage: z.string().nullable(),
        coverImage: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx.session;
      const updatedUser = await ctx.prisma.user.update({
        where: {
          id: user.id,
        },
        data: { ...input },
      });
      return updatedUser;
    }),
  follow: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input: { userId } }) => {
      //TODO: create a model for follow with follower and followed users or add an entry in User for followers
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });
      if (!user) throw new TRPCError({ code: "NOT_FOUND" });

      let updatedFollowingIds = [...user.followingIds];

      if (updatedFollowingIds.includes(userId)) {
        updatedFollowingIds = updatedFollowingIds.filter(
          (followingIds) => followingIds !== userId
        );
      } else {
        updatedFollowingIds.push(userId);

        await ctx.prisma.notification.create({
          data: {
            body: "Someone followed you!",
            userId,
          },
        });

        await ctx.prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            hasNotification: true,
          },
        });
      }

      const updatedUser = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          followingIds: updatedFollowingIds,
        },
      });
      return updatedUser;
    }),
});
