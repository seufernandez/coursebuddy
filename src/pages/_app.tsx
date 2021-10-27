// import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Provider as NextauthProvider } from 'next-auth/client';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from '../components/Header';

import '../styles/globals.scss';
import { theme } from '../styles/theme';
import useLocale from '../services/hooks/useLocale';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const t = useLocale();

  return (
    <QueryClientProvider client={queryClient}>
      <NextauthProvider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          <Head>
            <meta name="description" content={t.document.description} />
          </Head>

          <Header />
          <Component {...pageProps} />
        </ChakraProvider>
      </NextauthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
