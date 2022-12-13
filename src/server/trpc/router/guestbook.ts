import { z } from 'zod';
import { router, protectedProcedure, publicProcedure } from '../trpc';

export const guestBookRouter = router({
    getAll: publicProcedure.query(async ({ ctx }) => {
        try {
            return await ctx.prisma.guestBook.findMany({
                select: {
                    name: true,
                    message: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            });
        } catch(err) {
            console.log("error", err);
        }
    }),
    postMessage: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                message: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            try {
                await ctx.prisma.guestBook.create({
                    data: {
                        name: input.name,
                        message: input.message,
                    },
                });
            } catch(err) {
                console.log(err);
            }
        }),
});
