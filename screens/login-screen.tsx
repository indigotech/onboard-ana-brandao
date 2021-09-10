import React, {useState} from 'react';

import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const isValidEmail = (email: string) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.com$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,50}$/;
  return passwordRegex.test(password);
};

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
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
  };

  return (
    <View>
      <Text style={styles.loginDescription}>E-mail</Text>
      <TextInput
        style={styles.loginInput}
        value={email}
        onChangeText={setEmail}
        placeholder="Digite seu e-mail"
      />
      <Text style={styles.loginDescription}>Senha</Text>
      <TextInput
        style={styles.loginInput}
        value={password}
        onChangeText={setPassword}
        placeholder="Digite sua senha"
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {
          handleLogin();
        }}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default LoginScreen;
