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
        'h-screen w-full bg-gray-200 dark:bg-gray-800 dark:text-white',
        { 'md:w-20': !sidebarFullWidth, 'md:w-72': sidebarFullWidth }
      )}
    >
      <SidebarHeader />
      <SidebarBody />
    </aside>
  );
};

export default Sidebar;
