import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import React, { Component } from "react";
import theme from "../theme";
import {
  ApolloCache,
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import "focus-visible/dist/focus-visible";

import { Global, css } from "@emotion/react";
const GlobalStyles = css`
  /*
    This will hide the focus indicator if the element receives focus    via the mouse,
    but it will still show up on keyboard focus.
  */
  .js-focus-visible :focus:not([data-focus-visible-added]) {
    outline: none;
    box-shadow: none;
  }
`;

const memoryCache = new InMemoryCache();

const client = new ApolloClient({
  uri: "http://ec2-52-90-57-180.compute-1.amazonaws.com:4000/graphql",
  credentials: "include",
  cache: memoryCache,
});
function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Global styles={GlobalStyles} />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
