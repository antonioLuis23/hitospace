import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import React from "react";
import theme from "../theme";
import { Provider, createClient } from "urql";
const client = createClient({
  url: "http://localhost:4000/graphql",
});
function MyApp({ Component, pageProps }) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <ColorModeProvider
          options={{
            useSystemColorMode: true,
          }}
        >
          <Component {...pageProps} />
        </ColorModeProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
