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
  query Users($offset: Int!, $limit: Int!) {
    users(pageInfo: {offset: $offset, limit: $limit}) {
      nodes {
        id
        name
        email
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

export interface UsersQuery {
  users: Results;
}
interface Results {
  nodes: User[];
  pageInfo: PageInfo;
}
export interface User {
  id: string;
  name: string;
  email: string;
}
interface PageInfo {
  hasNextPage: boolean;
}
export interface PageInput {
  offset: number;
  limit: number;
}
