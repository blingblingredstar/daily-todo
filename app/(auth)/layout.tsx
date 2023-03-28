import { FC, PropsWithChildren } from 'react';
import '@/styles/global.css';
import { Inter } from 'next/font/google';
import GlassPane from '@/components/GlassPane';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata = {
  title: 'Daily todo',
  description: 'Manage your daily projects',
};

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="en" className={inter.variable}>
      <head></head>
      <body className="h-screen w-screen rainbow-mesh p-6">
        <GlassPane className="w-full h-full flex items-center justify-center">
          {children}
        </GlassPane>
      </body>
    </html>
  );
};

export default Layout;
