// src/server/router/index.ts
import superjson from 'superjson';

import { createRouter } from '@/server/router/context';
import { todoRouter } from '@/server/router/todos';

export const appRouter = createRouter().transformer(superjson).merge('todos.', todoRouter);

export type AppRouter = typeof appRouter;
