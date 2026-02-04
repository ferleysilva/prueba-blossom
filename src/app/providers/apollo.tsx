import { ApolloClient, InMemoryCache, ApolloProvider as Provider } from '@apollo/client';
import React from 'react';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache(),
});

export const ApolloProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider client={client}>{children}</Provider>
);
