import Link from 'next/link';
import {
  BOOKMARKS_PATH,
  HOME_PATH,
  PHOTOGRAPHY_PATH,
  USES_PATH,
  WORK_PATH,
  WRITING_PATH
} from '../../utils/paths';
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
  FaLinkedin,
  FaMedium,
  FaTwitter,
  FaUnsplash,
  FaWrench
} from 'react-icons/fa';
import { FC } from 'react';
import { uiAtom } from '../../utils/store';
import { useAtom } from 'jotai';
import { useRouter } from 'next/router';

const sidebarLinks = [
  { title: 'Home', icon: <FaHome />, url: HOME_PATH },
  { title: 'Work', icon: <FaLaptopCode />, url: WORK_PATH },
  { title: 'Writing', icon: <FaFileAlt />, url: WRITING_PATH },
  { title: 'Me', sectionTitle: true },
  { title: 'Bookmarks', icon: <FaBookmark />, url: BOOKMARKS_PATH },
  { title: 'Uses ', icon: <FaWrench />, url: USES_PATH },
  { title: 'Photography', icon: <FaCamera />, url: PHOTOGRAPHY_PATH },
  { title: 'Online', sectionTitle: true },
  { title: 'LinkedIn ', icon: <FaLinkedin />, isExternal: true },
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
  const router = useRouter();

  const listItem = item => {
    return (
      <li
        className={clsx(
          'mt-2 flex items-center justify-between p-2',
          'rounded-lg text-base font-normal text-gray-900 dark:text-white',
          {
            'cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700':
              !item.sectionTitle
          },
          { 'mt-9': item.sectionTitle },
          {
            'bg-gray-300 dark:bg-gray-700': router.asPath === item.url
          }
        )}
      >
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
          {item.isExternal && sidebarOpen ? <FaExternalLinkAlt /> : null}
        </>
      </li>
    );
  };

  return (
    <div className="overflow-scroll pb-8">
      <ul className="pt-6">
        {sidebarLinks.map((item, index) => {
          if (item.isExternal) {
            return (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {listItem(item)}
              </a>
            );
          } else {
            return (
              <Link key={index} href={item.url ?? {}}>
                {listItem(item)}
              </Link>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default SidebarLinks;
