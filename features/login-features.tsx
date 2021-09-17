import {gql} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const isValidEmail = (email: string) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.com+\.br$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,50}$/;
  return passwordRegex.test(password);
};

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
