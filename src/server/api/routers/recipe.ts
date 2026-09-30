import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const recipeRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1),
        ingredients: z.array(z.string()).optional(),
        instructions: z.string().optional(),
        cookTime: z.number().optional(),
        image: z.string().optional(),
        tags: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // create a richer Recipe record
      return ctx.db.recipe.create({
        data: {
          title: input.title,
          ingredients: input.ingredients ?? [],
          instructions: input.instructions ?? "",
          cookTime: input.cookTime ?? null,
          image: input.image ?? null,
          tags: input.tags ?? [],
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.recipe.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
      include: { createdBy: true },
    });
  }),
});
