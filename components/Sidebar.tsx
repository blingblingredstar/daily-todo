import { FC } from 'react';
import Card from './Card';
import Image from 'next/image';
import logo from '@/assets/images/logo.png';
import SidebarLink, { Link } from './SidebarLink';

const links: Link[] = [
  { label: 'Home', link: '/home' },
  { label: 'Calendar', link: '/calendar' },
  { label: 'Profile', link: '/profile' },
  { label: 'Settings', link: '/settings' },
];

const Sidebar: FC = () => {
  return (
    <Card className="h-full w-40 flex items-center justify-between flex-wrap">
      {links.map((link) => (
        <SidebarLink link={link} key={link.label} />
      ))}
    </Card>
  );
};

export default Sidebar;
