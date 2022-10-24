import Sidebar from './sidebar';
import Head from 'next/head';

function Layout({ children }) {
  return (
    <div className="flex">
      <Head>
        <title>Oleg Chursin</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Oleg Chursin" key="title" />
      </Head>
      <Sidebar />
      <main className="h-screen flex-1 p-6">{children}</main>
    </div>
  );
}

export default Layout;
