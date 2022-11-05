import Head from 'next/head';
import Layout from '../components/layout';
import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Oleg Chursin</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Oleg Chursin" key="title" />
      </Head>
      <ThemeProvider attribute="class">
        <JotaiProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </JotaiProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
