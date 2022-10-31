import Link from 'next/link';
import { clsx } from 'clsx';
import { FC } from 'react';
import { uiAtom } from '../utils/store';
import { useAtom } from 'jotai';

const Logo: FC = () => {
  const [{ sidebarOpen }] = useAtom(uiAtom);

  return (
    <Link href="/">
      <div
        className={clsx('flex cursor-pointer items-center', {
          'justify-center': !sidebarOpen
        })}
      >
        <img
          src="https://ik.imagekit.io/olegchursin/oc-profile_LypqvWxYJ.jpeg?tr=w-300,h-300"
          className="w-10 rounded-full duration-300"
        />
        <h1
          className={clsx(
            'ml-4 origin-left font-montserrat text-xl font-medium text-transparent',
            'bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text',
            { hidden: !sidebarOpen }
          )}
        >
          Oleg&nbsp;Chursin
        </h1>
      </div>
    </Link>
  );
};

export default Logo;
