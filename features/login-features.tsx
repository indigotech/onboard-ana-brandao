import {gql} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem('token', value);
  } catch (error) {}
};

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(data: {email: $email, password: $password}) {
      token
      user {
        name
        email
        role
        phone
        birthDate
        id
      }
    }
  }
`;
