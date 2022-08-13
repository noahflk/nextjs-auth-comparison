import { createNextApiHandler } from '@trpc/server/adapters/next';
import { withAuth } from '@clerk/nextjs/api';

import { appRouter } from '@/server/router';
import { createContext } from '@/server/router/context';

// export API handler
export default withAuth(
  // @ts-ignore
  createNextApiHandler({
    router: appRouter,
    createContext,
  })
);
