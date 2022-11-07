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
        'flex h-[72px] flex-row-reverse items-center justify-between md:flex-row',
        'border-b-[.5px] border-slate-400 p-4 duration-300',
        'dark:border-slate-700',
        { 'pl-6': sidebarFullWidth }
      )}
    >
      <span className="hidden md:block">
        <Logo />
      </span>
      <div className="cursor-pointer md:hidden" onClick={closeSidebar}>
        <FaTimes />
      </div>
    </div>
  );
};

export default SidebarHeader;
