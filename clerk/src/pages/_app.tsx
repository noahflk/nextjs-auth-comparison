import { useRouter } from 'next/router';
import { withTRPC } from '@trpc/next';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/nextjs';
import superjson from 'superjson';
import { Toaster } from 'react-hot-toast';
import type { AppType } from 'next/dist/shared/lib/utils';

import type { AppRouter } from '../server/router';
import '../styles/globals.css';

const publicPages = ['/sign-in/[[...index]]', '/sign-up/[[...index]]'];

const RedirectToSignIn = () => {
  const router = useRouter();

  router.push('/sign-in');

  return null;
};

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <>
      <ClerkProvider {...pageProps}>
        {publicPages.includes(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <>
            <SignedIn>
              <Component {...pageProps} />
            </SignedIn>

            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        )}
      </ClerkProvider>
      <Toaster />
    </>
  );
};

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return '';
  }
  if (process.browser) return ''; // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(MyApp);
