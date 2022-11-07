import SidebarBody from './sidebar-body';
import SidebarHeader from './sidebar-header';
import { clsx } from 'clsx';
import { FC } from 'react';
import { sidebarOpenAtom, uiAtom } from '../../utils/store';
import { useAtom } from 'jotai';

const Sidebar: FC = () => {
  const [{ sidebarFullWidth }] = useAtom(uiAtom);
  const [sidebarOpen] = useAtom(sidebarOpenAtom);

  return (
    <aside
      aria-label="Sidebar"
      className={clsx(
        `${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`,
        'absolute top-0 left-0 z-30 md:translate-x-0',
        'transition duration-300 ease-in-out md:relative',
        'h-screen bg-gray-200 sm:w-1/2 md:w-72',
        'dark:bg-gray-800 dark:text-white',
        { 'w-20': !sidebarFullWidth }
      )}
    >
      <SidebarHeader />
      <SidebarBody />
    </aside>
  );
};

export default Sidebar;
