import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const notificationRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const notifications = await ctx.prisma.notification.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    await ctx.prisma.user.update({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        hasNotification: false,
      },
    });
    return notifications;
  }),
});
