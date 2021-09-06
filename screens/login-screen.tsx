import React, {useState} from 'react';

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <Text style={styles.loginDescription}>E-mail</Text>
      <TextInput
        style={styles.loginInput}
        value={email}
        onChangeText={setEmail}
        placeholder="example@example.com"
      />
      <Text style={styles.loginDescription}>Senha</Text>
      <TextInput
        style={styles.loginInput}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton}>
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
