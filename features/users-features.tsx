import {gql, HttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const httpLink = new HttpLink({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
});

export const authLink = setContext(async (_, {headers}) => {
  const token = await AsyncStorage.getItem('token');

  return {
    headers: {
      ...headers,
      authorization: token ? token : null,
    },
  };
});

export const USERS_QUERY = gql`
  query {
    users {
      nodes {
        id
        name
        email
      }
    }
  }
`;
