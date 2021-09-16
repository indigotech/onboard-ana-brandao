/**
 * @format
 */

import React from 'react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
} from '@apollo/client';
import {Navigation} from 'react-native-navigation';

import {authLink, httpLink} from './features/users-features';
import {LoginScreen} from './screens/login-screen';
import {UsersScreen} from './screens/users-screen';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink, httpLink]),
});

Navigation.registerComponent(
  'Login',
  () => props =>
    (
      <ApolloProvider client={client}>
        <LoginScreen {...props} />
      </ApolloProvider>
    ),
  () => LoginScreen,
);
Navigation.registerComponent(
  'Users',
  () => props =>
    (
      <ApolloProvider client={client}>
        <UsersScreen {...props} />
      </ApolloProvider>
    ),
  () => UsersScreen,
);

Navigation.events().registerAppLaunchedListener(async () => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'Login',
            },
          },
        ],
      },
    },
  });
});
