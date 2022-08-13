import { z } from 'zod';

import { createRouter } from '@/server/router/context';

export const todoRouter = createRouter()
  .query('get-all', {
    async resolve({ ctx }) {
      return await ctx.prisma.todo.findMany({
        where: { userId: 'aaa' },
      });
    },
  })
  .mutation('create', {
    input: z.object({ name: z.string() }),
    async resolve({ input, ctx }) {
      return await ctx.prisma.todo.create({ data: { name: input.name, userId: 'aaa' } });
    },
  })
  .mutation('set-status', {
    input: z.object({ id: z.number(), done: z.boolean() }),
    async resolve({ input, ctx }) {
      const todo = await ctx.prisma.todo.findFirst({ where: { id: input.id, userId: 'aaa' } });

      if (!todo) {
        throw new Error('Todo not found');
      }

      return await ctx.prisma.todo.update({
        where: { id: input.id },
        data: { done: input.done },
      });
    },
  })
  .mutation('delete', {
    input: z.object({ id: z.number() }),
    async resolve({ input, ctx }) {
      const todo = await ctx.prisma.todo.findFirst({ where: { id: input.id, userId: 'aaa' } });

      if (!todo) {
        throw new Error('Todo not found');
      }

      return await ctx.prisma.todo.delete({ where: { id: input.id } });
    },
  });
