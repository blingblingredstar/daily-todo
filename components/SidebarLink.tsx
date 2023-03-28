'use client';
import Link from 'next/link';
import { Settings, User, Grid, Calendar, Icon } from 'react-feather';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
import clsx from 'clsx';

type LinkLabel = 'Home' | 'Profile' | 'Calendar' | 'Settings';

const ICONS: Record<LinkLabel, Icon> = {
  Settings,
  Profile: User,
  Home: Grid,
  Calendar,
};

export type Link = {
  label: LinkLabel;
  link: string;
};

const SidebarLink: FC<{ link: Link }> = ({ link }) => {
  const pathname = usePathname();
  const isActive = pathname === link.link;
  const Icon = ICONS[link.label];
  return (
    <Link href={link.link} className="w-full flex justify-center items-center">
      <Icon
        size={40}
        className={clsx(
          'stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out',
          isActive && 'stroke-violet-600'
        )}
      />
    </Link>
  );
};

export default SidebarLink;
