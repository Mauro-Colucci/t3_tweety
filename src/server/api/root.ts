import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";

export const appRouter = createTRPCRouter({
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
