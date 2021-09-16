/**
 * @format
 */

import React from 'react';

import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {Navigation} from 'react-native-navigation';

import {LoginScreen} from './screens/login-screen';
import {UsersScreen} from './screens/users-screen';

const client = new ApolloClient({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
  cache: new InMemoryCache(),
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
Navigation.registerComponent('Users', () => UsersScreen);

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
