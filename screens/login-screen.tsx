import React, {useState} from 'react';

import {useMutation} from '@apollo/client';
import {Alert, View, ActivityIndicator} from 'react-native';
import {Navigation} from 'react-native-navigation';

import {storeData, LOGIN_MUTATION} from '../features/login-features';
import {isValidEmail, isValidPassword} from '../features/validations';
import {Button, ButtonText} from '../styled-components/button';
import {FormField, FormError} from '../styled-components/forms';
import {H1} from '../styled-components/heading';

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
    }
  };

  return (
    <View>
      <H1> Bem-vindo(a) à Taqtile! </H1>
      <FormField
        label="E-mail"
        autoCapitalize="none"
        placeholder="email@email.com.br"
        value={email}
        onChangeText={setEmail}
        secureTextEntry={false}
        keyboardType="email-address"
        onEndEditing={isValidEmail(email)}
      />
      <FormField
        label="Senha"
        autoCapitalize="none"
        placeholder="Mínimo 7 caracteres, uma letra e um número"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        keyboardType="default"
        onEndEditing={isValidPassword(password)}
      />
      <Button
        disabled={loading}
        onPress={() => {
          handleLogin();
        }}>
        <ButtonText>{loading ? 'Carregando' : 'Entrar'}</ButtonText>
      </Button>
      {loading && <ActivityIndicator color="lightgrey" />}
      <FormError>{error && error.toString()}</FormError>
    </View>
  );
};
