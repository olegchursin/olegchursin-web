import { FC } from 'react';
import ThemeSwitch from './theme-switch';

const Navbar: FC = () => {
  return (
    <div className="border-b-[.5px] border-slate-400 dark:border-slate-700">
      <div className="flex place-items-center justify-between py-4 px-6">
        <div>Nav</div>
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Navbar;
