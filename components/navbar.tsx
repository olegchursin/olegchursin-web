import ThemeSwitch from './theme-switch';
import { FC } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Hamburger from './hamburger';
import Logo from './logo';

const Navbar: FC = () => {
  const router = useRouter();
  const activePath = router.asPath.substring(1);

  return (
    <div
      className={clsx(
        'sticky top-0 z-10 h-[72px] border-b-[.5px] border-slate-400 duration-300 dark:border-slate-700',
        'bg-gray-100 bg-opacity-70 backdrop-blur-lg backdrop-filter dark:bg-gray-900 dark:bg-opacity-70'
      )}
    >
      <div className="flex place-items-center justify-between py-4 px-6">
        <div className="md:hidden">
          <Hamburger />
        </div>
        <div className="hidden capitalize md:block">{activePath}</div>
        <div className="duration-300 md:hidden">
          <Logo showPhoto={false} />
        </div>
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Navbar;
