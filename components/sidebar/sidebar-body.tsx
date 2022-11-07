import SidebarLinks from './sidebar-links';
import SidebarToggle from './sidebar-toggle';
import { FC } from 'react';

const SidebarBody: FC = () => {
  return (
    <div className="h-100 flex flex-col justify-between px-6 pt-0">
      <SidebarLinks />
      <SidebarToggle />
    </div>
  );
};

export default SidebarBody;
