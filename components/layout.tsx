import Navbar from './navbar';
import Sidebar from './sidebar/sidebar';
import { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex 2xl:container">
      <Sidebar />
      <main className="relative flex max-h-screen w-full flex-1 flex-col overflow-y-auto bg-gray-100 antialiased duration-300  dark:bg-gray-900 dark:text-white">
        <Navbar />
        <div className="container py-6 lg:max-w-3xl">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
