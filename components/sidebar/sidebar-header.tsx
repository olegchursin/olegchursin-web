import Logo from '../logo';
import React from 'react';
import { clsx } from 'clsx';
import { FaTimes } from 'react-icons/fa';
import { sidebarOpenAtom, uiAtom } from '../../utils/store';
import { useAtom } from 'jotai';

const SidebarHeader = () => {
  const [{ sidebarFullWidth }] = useAtom(uiAtom);
  const [sidebarOpen, setOpen] = useAtom(sidebarOpenAtom);

  const closeSidebar = () => {
    setOpen(false);
  };

  return (
    <div
      className={clsx(
        'flex items-center justify-between',
        'border-b-[.5px] border-slate-400 p-4 duration-300',
        'dark:border-slate-700',
        { 'pl-6': sidebarFullWidth }
      )}
    >
      <Logo />
      <div className="cursor-pointer md:hidden" onClick={closeSidebar}>
        <FaTimes />
      </div>
    </div>
  );
};

export default SidebarHeader;
