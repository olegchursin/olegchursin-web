import Head from 'next/head';
import Navbar from './navbar';
import Sidebar from './sidebar/sidebar';
import { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex">
      <Head>
        <title>Oleg Chursin</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Oleg Chursin" key="title" />
      </Head>
      <Sidebar />
      <main className="h-100 flex-1 bg-gray-100 antialiased duration-300 dark:bg-gray-900 dark:text-white">
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
