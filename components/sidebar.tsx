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
import { FC, useState } from 'react';
import { useHasMounted } from '../utils/hooks';

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
  if (!useHasMounted) {
    return null;
  }

  const [open, setOpen] = useState(true);

  const openSidebar = () => {
    console.log('open');
  };

  return (
    <aside
      aria-label="Sidebar"
      className={` ${
        open ? 'w-72' : 'w-20 '
      } relative h-screen p-5 pt-8 duration-300 dark:bg-gray-800`}
    >
      <div className="flex h-full flex-col justify-between">
        <div className="overflow-scroll pb-8">
          <div className="flex items-center gap-x-4 ">
            <img
              src="https://ik.imagekit.io/olegchursin/oc-profile_LypqvWxYJ.jpeg?tr=w-300,h-300"
              className="w-10 rounded-full duration-300"
            />
            <h1 className="origin-left bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text font-montserrat text-xl font-medium text-transparent text-white">
              Oleg&nbsp;Chursin
            </h1>
          </div>
          <ul className="pt-6">
            {sidebarItems.map((item, index) => (
              <li
                key={index}
                className={`flex items-center justify-between rounded-lg p-2 text-base font-normal text-gray-900  dark:text-white 
        ${
          item.sectionTitle
            ? 'mt-9'
            : 'mt-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
              >
                <Link href={item.url ?? '/'}>
                  <>
                    <div className="flex items-center">
                      {item.icon && <span>{item.icon}</span>}
                      <span
                        className={`${!open && 'hidden'} ${
                          item.icon && 'ml-4'
                        } origin-left duration-200`}
                      >
                        {item.title}
                      </span>
                    </div>
                    {item.isExternal && open ? (
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
            className={`absolute right-7 bottom-4 h-6 w-6 cursor-pointer text-gray-100  ${
              !open && 'rotate-180'
            }`}
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
