import { AppProps } from 'next/app';
// import React from 'react';
import { Provider as NextauthProvider } from 'next-auth/client';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Header from '../components/Header';

import '../styles/globals.scss';
import { theme } from '../styles/theme';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextauthProvider session={pageProps.session}>
        <ChakraProvider theme={theme}>
          <Header />
          <Component {...pageProps} />
        </ChakraProvider>
      </NextauthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
