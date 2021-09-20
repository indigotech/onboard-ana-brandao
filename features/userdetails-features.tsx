import {gql} from '@apollo/client';

export const USER_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      phone
      birthDate
      email
      role
    }
  }
`;

export interface UserQuery {
  user: UserDetails;
}

interface UserDetails {
  id: string;
  name: string;
  phone: string;
  birthDate: string;
  email: string;
  role: string;
}
