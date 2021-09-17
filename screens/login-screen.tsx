import React, {useState} from 'react';

import {useMutation} from '@apollo/client';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {Navigation} from 'react-native-navigation';

import {storeData, LOGIN_MUTATION} from '../features/login-features';
import {styles} from '../features/styles';
import {isValidEmail, isValidPassword} from '../features/validations';

export const LoginScreen = (props: {componentId: string}) => {
  React.useEffect(() => {
    Navigation.mergeOptions(props.componentId, {
      topBar: {
        title: {alignment: 'center', text: 'Login'},
      },
    });
  }, [props.componentId]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login, {loading, error}] = useMutation(LOGIN_MUTATION, {
    onCompleted: async data => {
      await storeData(data.login.token);
      Navigation.push(props.componentId, {
        component: {
          name: 'Users',
        },
      });
    },
    onError: () => {},
  });
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
      <Text style={styles.formDescription}>E-mail</Text>
      <TextInput
        style={styles.formInput}
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        placeholder="email@email.com.br"
      />
      <Text style={styles.formDescription}>Senha</Text>
      <TextInput
        style={styles.formInput}
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
        placeholder="0000aaaa"
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.formButton}
        disabled={loading}
        onPress={() => {
          handleLogin();
        }}>
        <Text style={styles.formButtonText}>
          {loading ? 'Carregando' : 'Entrar'}
        </Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator color="lightgrey" />}
      <Text style={styles.formError}>{error && error.toString()}</Text>
    </View>
  );
};
