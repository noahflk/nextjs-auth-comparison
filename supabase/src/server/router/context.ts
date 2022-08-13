// src/server/router/context.ts
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

import { prisma } from '@/server/db/client';
import { supabase } from '@/utils/supabase';

export const createContext = async (opts?: trpcNext.CreateNextContextOptions) => {
  const req = opts?.req;
  const res = opts?.res;
  const { user } = await supabase.auth.api.getUserByCookie(req);

  return {
    req,
    res,
    prisma,
    userId: user?.id,
  };
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
