import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useAuth0 } from "@auth0/auth0-react";

import React, { useEffect, useState } from "react";

const httpLink = createHttpLink({
  uri: "http://localhost:4001",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const updateClientLink = (token: string) => {
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });
  client.setLink(authLink.concat(httpLink));
};

interface Props {
  children: React.ReactNode;
}
export default function ApolloClientProvider({ children }: Props) {
  const { getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState<string>();
  useEffect(() => {
    if (!token) {
      getAccessTokenSilently().then((response) => {
        setToken(response);
        updateClientLink(response);
      });
    }
  }, [token]);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
