import { FC } from 'react';
import ThemeSwitch from './theme-switch';

const Navbar: FC = () => {
  return (
    <div className="sticky top-0 z-10 border-b-[.5px] border-slate-400 bg-gray-100 opacity-60 backdrop-blur-xl backdrop-saturate-150 dark:border-slate-700 dark:bg-gray-900">
      <div className="flex place-items-center justify-between py-4 px-6">
        <div>Nav</div>
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Navbar;
