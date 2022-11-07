import { clsx } from 'clsx';
import { FaChevronLeft } from 'react-icons/fa';
import { FC } from 'react';
import { uiAtom } from '../../utils/store';
import { useAtom } from 'jotai';

const SidebarToggle: FC = () => {
  const [{ sidebarFullWidth }, setFullWidth] = useAtom(uiAtom);

  const toggleSidebarFullWidth = () => {
    setFullWidth({ sidebarFullWidth: !sidebarFullWidth });
  };

  return (
    <div className="hidden p-4 duration-300 dark:bg-gray-800 md:block">
      <FaChevronLeft
        className={clsx(
          'absolute right-7 bottom-4 h-6 w-6 cursor-pointer dark:text-gray-100',
          { 'rotate-180': !sidebarFullWidth }
        )}
        onClick={toggleSidebarFullWidth}
      />
    </div>
  );
};

export default SidebarToggle;
