import { createRouter } from './context';
import superjson from 'superjson';

import { todoRouter } from '@/server/router/todos';

export const appRouter = createRouter().transformer(superjson).merge('todos.', todoRouter);

export type AppRouter = typeof appRouter;
