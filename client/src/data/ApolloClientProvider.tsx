import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";

import React, { useMemo } from "react";

const createApolloClient = (getAccessToken) => {
  const httpLink = createHttpLink({
    uri: "http://localhost:5286/graphql",
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = await getAccessToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

interface Props {
  children: React.ReactNode;
}
export default function ApolloClientProvider({ children }: Props) {
  const { getAccessTokenSilently } = useAuth0();

  const client = useMemo(
    () => createApolloClient(getAccessTokenSilently),
    [getAccessTokenSilently]
  );

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
