import Link from 'next/link';
import { clsx } from 'clsx';
import { FC } from 'react';
import { uiAtom } from '../utils/store';
import { useAtom } from 'jotai';
import Image from 'next/image';

interface LogoProps {
  readonly showPhoto?: boolean;
}

const Logo: FC<LogoProps> = ({ showPhoto = true }) => {
  const [{ sidebarFullWidth }] = useAtom(uiAtom);

  const photo = showPhoto ? (
    <Image
      src="https://ik.imagekit.io/olegchursin/oc-profile_LypqvWxYJ.jpeg?tr=w-300,h-300"
      className="rounded-full duration-300"
      width="40px"
      height="40px"
      alt="Oleg Chursin"
    />
  ) : null;

  const text = (
    <h1
      className={clsx(
        'origin-left font-montserrat text-xl font-medium text-transparent',
        'bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text',
        { hidden: !sidebarFullWidth }
      )}
    >
      Oleg&nbsp;Chursin
    </h1>
  );

  return (
    <Link href="/">
      <div
        className={clsx('flex cursor-pointer items-center gap-4', {
          'justify-center': !sidebarFullWidth
        })}
      >
        {photo}
        {text}
      </div>
    </Link>
  );
};

export default Logo;
