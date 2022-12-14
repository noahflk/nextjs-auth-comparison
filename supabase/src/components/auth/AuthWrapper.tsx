import Image from 'next/image';
import Link from 'next/link';

import image from 'public/images/symbolic-1.jpg';

type AuthType = 'signin' | 'signup' | 'forgot';

type Props = {
  type: AuthType;
  children: React.ReactNode;
};

const AlternativeLink: React.FC<{ type: AuthType }> = ({ type }) => {
  if (type === 'signup') return <Link href="/signin">sign in with your account</Link>;

  return <Link href="/signup">create a new account</Link>;
};

const authTypeToText = (type: AuthType): string => {
  if (type === 'signin') return 'SignIn';
  if (type === 'signup') return 'SignUp';

  return 'Forgot password';
};

export const AuthWrapper: React.FC<Props> = ({ children, type }) => (
  <>
    <div className="flex min-h-screen">
      <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="w-full max-w-sm mx-auto lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              {type === 'signup' && 'Create a new account'}
              {type === 'signin' && 'Sign in with your account'}
              {type === 'forgot' && 'Reset your password'}
            </h2>
            {type != 'forgot' && (
              <p className="mt-2 text-sm">
                Or <AlternativeLink type={type} />
              </p>
            )}
          </div>

          <div className="mt-8">
            <div className="mt-6">{children}</div>
          </div>
        </div>
      </div>
      <div className="relative flex-1 hidden w-0 lg:block">
        <Image
          className="absolute inset-0 w-full h-full"
          layout="fill"
          objectFit="cover"
          src={image}
          alt="Symbolic train image"
        />
      </div>
    </div>
  </>
);
