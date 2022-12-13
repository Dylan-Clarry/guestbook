import { router } from "../trpc";
import { authRouter } from "./auth";
import { guestBookRouter } from './guestbook';

export const appRouter = router({
    auth: authRouter,
    guestbook: guestBookRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
