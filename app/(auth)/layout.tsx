import { FC, PropsWithChildren } from 'react';

export const metadata = {
  title: 'Sign in',
  description: 'Sign in the app',
};

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};

export default Layout;
