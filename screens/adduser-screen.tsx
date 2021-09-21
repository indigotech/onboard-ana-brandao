import React, {useState} from 'react';

import {useMutation} from '@apollo/client';
import {Alert, ScrollView, ActivityIndicator} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {RadioButton} from 'react-native-paper';

import {ADDUSER_MUTATION} from '../features/adduser-features';
import {
  isValidPhone,
  isValidBirthDate,
  isValidEmail,
  isValidPassword,
  isValidName,
} from '../features/validations';
import {Button, ButtonText} from '../styled-components/button';
import {Form, FormError, FormLabel} from '../styled-components/forms';
import {styles} from '../styled-components/styles';

export const AddUserScreen = (props: {componentId: string}) => {
  React.useEffect(() => {
    Navigation.mergeOptions(props.componentId, {
      topBar: {
        title: {alignment: 'center', text: 'Novo Usuário'},
      },
    });
  }, [props.componentId]);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [addUser, {loading, error}] = useMutation(ADDUSER_MUTATION, {
    onCompleted: () => {
      Navigation.pop(props.componentId);
    },
    onError: () => {},
  });

  const handleAddUser = async () => {
    if (
      name.length === 0 ||
      phone.length === 0 ||
      birthDate.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      role.length === 0
    ) {
      Alert.alert('Campos obrigatórios!', 'Insira todos os dados.', [
        {text: 'Ok'},
      ]);
      return;
    } else {
      await addUser({
        variables: {name, phone, birthDate, email, password, role},
      });
    }
  };

  return (
    <ScrollView>
      <Form
        label="Nome completo"
        autoCapitalize="words"
        placeholder="Nome Sobrenome"
        value={name}
        onChangeText={setName}
        secureTextEntry={false}
        keyboardType="default"
        onEndEditing={isValidName(name)}
      />
      <Form
        label="Telefone"
        autoCapitalize="none"
        placeholder="Com DDD, somente números"
        value={phone}
        onChangeText={setPhone}
        secureTextEntry={false}
        keyboardType="numeric"
        onEndEditing={isValidPhone(phone)}
      />
      <Form
        label="Data de nascimento"
        autoCapitalize="none"
        placeholder="AAAA-MM-DD"
        value={birthDate}
        onChangeText={setBirthDate}
        secureTextEntry={false}
        keyboardType="phone-pad"
        onEndEditing={isValidBirthDate(birthDate)}
      />
      <Form
        label="E-mail"
        autoCapitalize="none"
        placeholder="email@email.com.br"
        value={email}
        onChangeText={setEmail}
        secureTextEntry={false}
        keyboardType="email-address"
        onEndEditing={isValidEmail(email)}
      />
      <Form
        label="Senha"
        autoCapitalize="none"
        placeholder="Mínimo 7 caracteres, uma letra e um número"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        keyboardType="default"
        onEndEditing={isValidPassword(password)}
      />
      <FormLabel isValid>{'Cargo'}</FormLabel>
      <RadioButton.Group onValueChange={value => setRole(value)} value={role}>
        <RadioButton.Item
          label="Admin"
          labelStyle={styles.radioButton}
          value="admin"
        />
        <RadioButton.Item
          label="User"
          labelStyle={styles.radioButton}
          value="user"
        />
      </RadioButton.Group>
      <Button
        disabled={loading}
        onPress={() => {
          handleAddUser();
        }}>
        <ButtonText>{loading ? 'Carregando' : 'Adicionar usuário'}</ButtonText>
      </Button>
      {loading && <ActivityIndicator color="lightgrey" />}
      <FormError>{error && error.toString()}</FormError>
    </ScrollView>
  );
};
