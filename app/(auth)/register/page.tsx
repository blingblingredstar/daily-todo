import AuthForm from '@/components/AuthForm';
import { FC } from 'react';

const RegisterPage: FC = () => {
  return (
    <div>
      <AuthForm mode="register" />
    </div>
  );
};

export default RegisterPage;
