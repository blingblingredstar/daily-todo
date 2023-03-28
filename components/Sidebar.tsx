import { FC } from 'react';
import Card from './Card';
import SidebarLink, { Link } from './SidebarLink';
import { Route } from '@/lib/routes';

const links: Link[] = [
  { label: 'Home', link: Route.home },
  { label: 'Calendar', link: Route.calendar },
  { label: 'Profile', link: Route.profile },
  { label: 'Settings', link: Route.settings },
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
