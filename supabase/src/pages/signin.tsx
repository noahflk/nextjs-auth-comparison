import type { GetServerSideProps, NextPage } from 'next';

import { AuthWrapper } from '@/components/auth/AuthWrapper';
import { SignInForm } from '@/components/auth/SignInForm';
import { protectedAuth } from '@/utils/auth';

const SignIn: NextPage = () => (
  <AuthWrapper type="signin">
    <SignInForm />
  </AuthWrapper>
);

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return protectedAuth(req);
};

export default SignIn;
