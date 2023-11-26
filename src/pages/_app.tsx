import React from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import "../styles/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <QueryClientProvider client={queryClient}>
      <React.Fragment>
        <Head>
          <title>BetterParent</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
          <link rel="icon" href="/faviconBetterParent.png"></link>
        </Head>
        <Component {...pageProps} />
      </React.Fragment>
    </QueryClientProvider>
  );
}

export default MyApp;
