import { FC, PropsWithChildren } from 'react';
import '@/styles/global.css';
import { Inter } from 'next/font/google';
// import Sidebar from '@/components/Sidebar';
import clsx from 'clsx';
import GlassPane from '@/components/GlassPane';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Daily todo Dashboard',
  description: 'Manage your daily projects',
};

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" className={clsx(inter.variable, 'dark')}>
      <head />
      <body className="h-screen w-screen candy-mesh p-6">
        <GlassPane className="w-full h-full p-6 flex align-center container mx-auto">
          {/* <Sidebar /> */}
          <main className="w-full pl-6 h-full">{children}</main>
        </GlassPane>
      </body>
    </html>
  );
};

export default Layout;
