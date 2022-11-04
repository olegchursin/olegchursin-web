import ThemeSwitch from './theme-switch';
import { FC } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';

const Navbar: FC = () => {
  const router = useRouter();
  const activePath = router.asPath.substring(1);

  return (
    <div
      className={clsx(
        'sticky top-0 z-10 border-b-[.5px] border-slate-400 dark:border-slate-700',
        'bg-gray-100 bg-opacity-70 backdrop-blur-lg backdrop-filter dark:bg-gray-900 dark:bg-opacity-70'
      )}
    >
      <div className="flex place-items-center justify-between py-4 px-6">
        <div className="capitalize">{activePath}</div>
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Navbar;
