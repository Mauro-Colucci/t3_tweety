import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";
import { postRouter } from "./routers/post";
import { commentRouter } from "./routers/comment";
import { notificationRouter } from "./routers/notification";

export const appRouter = createTRPCRouter({
  user: userRouter,
  post: postRouter,
  comment: commentRouter,
  notification: notificationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
