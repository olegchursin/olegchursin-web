import SidebarLinks from './sidebar-links';
import { clsx } from 'clsx';
import { FaChevronLeft } from 'react-icons/fa';
import { FC } from 'react';
import { uiAtom } from '../../utils/store';
import { useAtom } from 'jotai';

const SidebarBody: FC = () => {
  const [{ sidebarOpen }, setOpen] = useAtom(uiAtom);

  const toggleSidebarOpen = () => {
    setOpen({ sidebarOpen: !sidebarOpen });
  };

  return (
    <div className="h-100 flex flex-col justify-between px-6 pt-0">
      <SidebarLinks />

      <div className="p-4 dark:bg-gray-800">
        <FaChevronLeft
          className={clsx(
            'absolute right-7 bottom-4 h-6 w-6 cursor-pointer text-gray-100',
            { 'rotate-180': !sidebarOpen }
          )}
          onClick={toggleSidebarOpen}
        />
      </div>
    </div>
  );
};

export default SidebarBody;
