import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwt from "jsonwebtoken";
import React from "react";
import cookie from "cookie";
import { getAccessToken, setAccessToken } from "./accessToken";
const { setContext } = require("apollo-link-context");

const isServer = () => typeof window === "undefined";

const initApolloClient = (initialState = {}, serverAccessToken?: string) => {
  const cache = new InMemoryCache().restore(initialState);

  const httpLink = createHttpLink({
    uri: "https://www.antonioluiscs.com.br/graphql",
    credentials: "include",
    fetch,
  });

  const authLink = setContext((_request, { headers }) => {
    const token = isServer() ? serverAccessToken : getAccessToken();
    return {
      headers: {
        ...headers,
        Authorization: token ? `bearer ${token}` : "",
      },
    };
  });

  const refreshLink = new TokenRefreshLink({
    accessTokenField: "accessToken",
    isTokenValidOrUndefined: () => {
      const token = getAccessToken();

      if (!token) {
        return true;
      }

      try {
        const { exp } = jwt.decode(token) as any;
        if (Date.now() >= exp * 1000) {
          return false;
        } else {
          return true;
        }
      } catch {
        return false;
      }
    },
    fetchAccessToken: () => {
      console.log("entrou fetchAccessToken!!!!!!");
      return fetch("http://localhost:4000/refresh_token", {
        method: "POST",
        credentials: "include",
      });
    },
    handleFetch: (accessToken) => {
      console.log("entrou handle Fetch. AccessToken:", accessToken);
      setAccessToken(accessToken);
      serverAccessToken = accessToken;
    },
    handleError: (err) => {
      console.warn("Your refresh token is invalid. Try to relogin");
      console.error(err);
    },
  });

  const client = new ApolloClient({
    ssrMode: false,
    link: authLink.concat(refreshLink).concat(httpLink),
    cache,
  });
  return client;
};

const withApollo = (PageComponent, { ssr = true } = {}) => {
  const WithApollo = ({
    apolloClient,
    serverAccessToken,
    apolloState,
    ...pageProps
  }) => {
    if (!isServer() && !getAccessToken()) {
      setAccessToken(serverAccessToken);
    }
    const client = apolloClient || initApolloClient(apolloState);

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };
  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx: any) => {
      // console.log("ctx:::", ctx);
      const { AppTree, req, res } = ctx;

      let serverAccessToken = "";

      if (isServer()) {
        if (req.headers.cookie) {
          const cookies = cookie.parse(req.headers.cookie);
          if (cookies.gte) {
            const response = await fetch(
              "https://www.antonioluiscs.com.br/refresh_token",
              {
                method: "POST",
                credentials: "include",
                headers: {
                  cookie: "gte=" + cookies.gte,
                },
              }
            );
            const data = await response.json();
            serverAccessToken = data.accessToken;
          }
        }
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apolloClient = (ctx.apolloClient = initApolloClient(
        {},
        serverAccessToken
      ));

      const pageProps = PageComponent.getInitialProps
        ? await PageComponent.getInitialProps(ctx)
        : {};

      // Only on the server
      if (typeof window === "undefined") {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (res && res.finished) {
          return {};
        }

        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import(
              "@apollo/client/react/ssr"
            );
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
                apolloClient={apolloClient}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error("Error while running `getDataFromTree`", error);
          }
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        // Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
        serverAccessToken,
      };
    };
  }

  return WithApollo;
};

export default withApollo;
