import SidebarBody from './sidebar-body';
import SidebarHeader from './sidebar-header';
import { clsx } from 'clsx';
import { FC } from 'react';
import { uiAtom } from '../../utils/store';
import { useAtom } from 'jotai';

const Sidebar: FC = () => {
  const [{ sidebarOpen }] = useAtom(uiAtom);

  return (
    <aside
      aria-label="Sidebar"
      className={clsx(
        'h-100 relative w-72 bg-gray-200 duration-300',
        'dark:bg-gray-800 dark:text-white',
        { 'w-20': !sidebarOpen }
      )}
    >
      <SidebarHeader />
      <SidebarBody />
    </aside>
  );
};

export default Sidebar;
