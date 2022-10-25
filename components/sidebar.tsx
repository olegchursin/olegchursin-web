import Link from 'next/link';
import {
  FaBookmark,
  FaCamera,
  FaChevronLeft,
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
import Logo from './logo';

import { useAtom } from 'jotai';
import { uiAtom } from '../utils/store';
import { clsx } from 'clsx';

const sidebarItems = [
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

const Sidebar: FC = () => {
  const [{ sidebarOpen }, setOpen] = useAtom(uiAtom);

  const toggleSidebarOpen = () => {
    setOpen({ sidebarOpen: !sidebarOpen });
  };

  return (
    <aside
      aria-label="Sidebar"
      className={clsx(
        'relative h-screen w-72 bg-gray-50 duration-300',
        'dark:bg-gray-800 dark:text-white',
        { 'w-20': !sidebarOpen }
      )}
    >
      <div>
        <div
          className={clsx(
            'border-b-[.5px] border-slate-400 p-4',
            'dark:border-slate-700',
            { 'pl-6': sidebarOpen }
          )}
        >
          <Logo />
        </div>

        <div className="flex h-full flex-col justify-between px-6 pt-0">
          <div className="overflow-scroll pb-8">
            <ul className="pt-6">
              {sidebarItems.map((item, index) => (
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

          <div className="p-4 dark:bg-gray-800">
            <FaChevronLeft
              className={clsx(
                'absolute right-7 bottom-4 h-6 w-6 cursor-pointer text-gray-100',
                { 'rotate-180': !sidebarOpen }
              )}
              onClick={toggleSidebarOpen}
            />
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
