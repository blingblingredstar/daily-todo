import AuthForm from '@/components/AuthForm';
import { FC } from 'react';

const SignInPage: FC = () => {
  return (
    <div>
      <AuthForm mode="signin" />
    </div>
  );
};

export default SignInPage;
