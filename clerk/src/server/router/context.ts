import * as trpc from '@trpc/server';
import { prisma } from '@/server/db/client';
import type { NextApiRequest, NextApiResponse } from 'next';

type ClerkSession = {
  auth?: {
    sessionId: string;
    userId: string;
  };
};

type ContextOptions = {
  req: NextApiRequest & ClerkSession;
  res: NextApiResponse;
};

export const createContext = (opts?: ContextOptions) => {
  const req = opts?.req;
  const res = opts?.res;

  return {
    req,
    res,
    prisma,
  };
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
