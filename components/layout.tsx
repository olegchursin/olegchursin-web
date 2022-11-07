import Navbar from './navbar';
import Sidebar from './sidebar/sidebar';
import { FC, PropsWithChildren } from 'react';
import clsx from 'clsx';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="3xl:container flex">
      <Sidebar />
      <main
        className={clsx(
          'relative flex h-screen max-h-screen w-full flex-1 flex-col overflow-y-auto',
          'bg-gray-100 antialiased duration-300 dark:bg-gray-900 dark:text-white'
        )}
      >
        <Navbar />
        <div className="container p-6 lg:max-w-3xl">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
