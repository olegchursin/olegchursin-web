import Link from 'next/link';
import { clsx } from 'clsx';
import {
  FaBookmark,
  FaCamera,
  FaDev,
  FaExternalLinkAlt,
  FaFileAlt,
  FaGithub,
  FaHome,
  FaLaptopCode,
  FaMedium,
  FaTwitter,
  FaUnsplash,
  FaWrench
} from 'react-icons/fa';
import { FC } from 'react';
import { uiAtom } from '../utils/store';
import { useAtom } from 'jotai';

const sidebarLinks = [
  { title: 'Home', icon: <FaHome />, url: '/' },
  { title: 'Work', icon: <FaLaptopCode />, url: '/work' },
  { title: 'Writing', icon: <FaFileAlt />, url: '/writing' },
  { title: 'Me', sectionTitle: true },
  { title: 'Bookmarks', icon: <FaBookmark />, url: '/bookmarks' },
  { title: 'Uses ', icon: <FaWrench />, url: '/uses' },
  { title: 'Photography', icon: <FaCamera /> },
  { title: 'Online', sectionTitle: true },
  { title: 'Twitter ', icon: <FaTwitter />, isExternal: true },
  { title: 'GitHub', icon: <FaGithub />, isExternal: true },
  { title: 'Dev.to', icon: <FaDev />, isExternal: true },
  { title: 'Medium', icon: <FaMedium />, isExternal: true },
  {
    title: 'Unsplash',
    icon: <FaUnsplash />,
    url: 'https://unsplash.com/@olegchursin_photo/stats',
    isExternal: true
  }
];

const SidebarLinks: FC = () => {
  const [{ sidebarOpen }] = useAtom(uiAtom);

  return (
    <div className="overflow-scroll pb-8">
      <ul className="pt-6">
        {sidebarLinks.map((item, index) => (
          <li
            key={index}
            className={clsx(
              'mt-2 flex items-center justify-between p-2',
              'cursor-pointer rounded-lg text-base font-normal text-gray-900',
              'hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700',
              { 'mt-9': item.sectionTitle }
            )}
          >
            <Link href={item.url ?? '/'}>
              <>
                <div className="flex items-center">
                  {item.icon && <span>{item.icon}</span>}
                  <span
                    className={clsx('origin-left duration-200', {
                      hidden: !sidebarOpen,
                      'ml-4': item.icon
                    })}
                  >
                    {item.title}
                  </span>
                </div>
                {item.isExternal && sidebarOpen ? (
                  <span>
                    <FaExternalLinkAlt />
                  </span>
                ) : null}
              </>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarLinks;
