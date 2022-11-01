import { useRouter } from 'next/router';
import { FC } from 'react';
import ThemeSwitch from './theme-switch';

const Navbar: FC = () => {
  const router = useRouter();
  const activePath = router.asPath.substring(1);

  return (
    <div className="sticky top-0 z-10 border-b-[.5px] border-slate-400 bg-gray-100 dark:border-slate-700 dark:bg-gray-900">
      <div className="flex place-items-center justify-between py-4 px-6">
        <div className="capitalize">{activePath}</div>
        <ThemeSwitch />
      </div>
    </div>
  );
};

export default Navbar;
