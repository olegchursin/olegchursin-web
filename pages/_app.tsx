import Head from 'next/head';
import Layout from '../components/layout';
import { Provider as JotaiProvider } from 'jotai';
import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useState } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <Head>
        <title>Oleg Chursin</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Oleg Chursin" key="title" />
      </Head>
      <ThemeProvider attribute="class">
        <JotaiProvider>
          <QueryClientProvider client={queryClient}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </QueryClientProvider>
        </JotaiProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
