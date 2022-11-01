import Logo from '../logo';
import React from 'react';
import { clsx } from 'clsx';
import { uiAtom } from '../../utils/store';
import { useAtom } from 'jotai';

const SidebarHeader = () => {
  const [{ sidebarOpen }] = useAtom(uiAtom);

  return (
    <div
      className={clsx(
        'border-b-[.5px] border-slate-400 p-4 duration-300',
        'dark:border-slate-700',
        { 'pl-6': sidebarOpen }
      )}
    >
      <Logo />
    </div>
  );
};

export default SidebarHeader;
