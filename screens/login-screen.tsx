import React, {useState} from 'react';

import {useMutation} from '@apollo/client';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Navigation} from 'react-native-navigation';

import {
  isValidEmail,
  isValidPassword,
  storeData,
  LOGIN_MUTATION,
} from './login-mutation';

export const LoginScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, {loading, error}] = useMutation(LOGIN_MUTATION, {
    onCompleted: async data => {
      await storeData(data.login.token);
      Navigation.push(props.componentId, {
        component: {
          name: 'Home',
        },
      });
    },
    onError: () => {},
  });
  React.useEffect(() => {
    Navigation.mergeOptions(props.componentId, {
      topBar: {
        title: {alignment: 'center', text: 'Login'},
      },
    });
  }, []);

  const handleLogin = async () => {
    if (isValidEmail(email) && isValidPassword(password)) {
      await login({variables: {email, password}});
    } else {
      if (email.length === 0 || password.length === 0) {
        Alert.alert('Campos obrigatórios!', 'Insira um e-mail e uma senha.', [
          {text: 'Ok'},
        ]);
        return;
      }
      if (password.length > 0 && password.length < 7) {
        Alert.alert(
          'Senha inválida!',
          'A senha deve ter ao menos 7 caracteres.',
          [{text: 'Ok'}],
        );
        return;
      }
      if (!isValidEmail(email)) {
        Alert.alert('Email inválido!', 'Insira um e-mail válido.', [
          {text: 'Ok'},
        ]);
        return;
      }
      if (!isValidPassword(password)) {
        Alert.alert(
          'Senha inválida!',
          'A senha deve ter ao menos um número e uma letra.',
          [{text: 'Ok'}],
        );
        return;
      }
    }
  };

  return (
    <View>
      <Text style={styles.welcome}> Bem-vindo(a) à Taqtile! </Text>
      <Text style={styles.loginDescription}>E-mail</Text>
      <TextInput
        style={styles.loginInput}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu e-mail"
      />
      <Text style={styles.loginDescription}>Senha</Text>
      <TextInput
        style={styles.loginInput}
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
        placeholder="Digite sua senha"
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.loginButton}
        disabled={loading}
        onPress={() => {
          handleLogin();
        }}>
        <Text style={styles.loginButtonText}>
          {loading ? 'Carregando' : 'Entrar'}
        </Text>
      </TouchableOpacity>
      <Text style={styles.loginError}>{error && error.toString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  welcome: {
    marginTop: 50,
    marginBottom: 30,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
  },
  loginDescription: {
    marginTop: 20,
    fontSize: 17,
    margin: 18,
    fontWeight: '300',
  },
  loginInput: {
    borderColor: 'lightgrey',
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    margin: 15,
  },
  loginButton: {
    marginTop: 45,
    backgroundColor: 'lightseagreen',
    padding: 12,
    borderRadius: 12,
    margin: 15,
  },
  loginButtonText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
  },
  loginError: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 15,
    color: 'red',
    fontWeight: '300',
  },
});
