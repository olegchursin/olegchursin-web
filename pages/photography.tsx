import type { NextPage } from 'next';
import { FaInstagram } from 'react-icons/fa';
import { HiCamera } from 'react-icons/hi2';

const photoResources = [
  {
    title: 'Lifestyle',
    icon: <HiCamera />,
    url: 'https://lifestyle.olegchursin.com/',
    isExternal: true
  },
  {
    title: 'Wedding',
    icon: <FaInstagram />,
    url: 'https://www.instagram.com/wedding.olegchursin/',
    isExternal: true
  },
  {
    title: 'Family',
    icon: <FaInstagram />,
    url: 'https://www.instagram.com/family.olegchursin/',
    isExternal: true
  },
  {
    title: 'Travel',
    icon: <FaInstagram />,
    url: 'https://www.instagram.com/travel.olegchursin/',
    isExternal: true
  }
];

const Photography: NextPage<any> = () => {
  return (
    <div>
      <h1 className="mt-2 text-3xl font-bold">Photography</h1>
    </div>
  );
};

export default Photography;
