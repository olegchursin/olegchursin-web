import Layout from '../components/layout';
import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider as JotaiProvider } from 'jotai';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <JotaiProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </JotaiProvider>
    </ThemeProvider>
  );
}

export default MyApp;
