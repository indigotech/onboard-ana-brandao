import React, {useState} from 'react';

import {useMutation} from '@apollo/client';
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {RadioButton} from 'react-native-paper';

import {ADDUSER_MUTATION} from '../features/adduser-features';
import {styles} from '../features/styles';
import {
  isValidPhone,
  isValidBirthDate,
  isValidEmail,
  isValidRole,
  isValidPassword,
} from '../features/validations';

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
    } else if (!isValidPhone(phone)) {
      Alert.alert('Telefone inválido!', 'Insira um telefone válido.', [
        {text: 'Ok'},
      ]);
      return;
    } else if (!isValidBirthDate(birthDate)) {
      Alert.alert(
        'Data de nascimento inválida!',
        'Insira uma data de nascimento válida.',
        [{text: 'Ok'}],
      );
      return;
    } else if (!isValidEmail(email)) {
      Alert.alert('Email inválido!', 'Insira um e-mail válido.', [
        {text: 'Ok'},
      ]);
      return;
    } else if (!isValidPassword(password)) {
      Alert.alert('Senha inválida!', 'Insira uma senha válida.', [
        {text: 'Ok'},
      ]);
      return;
    } else if (!isValidRole(role)) {
      Alert.alert('Cargo inválido!', 'Insira um cargo válido.', [{text: 'Ok'}]);
      return;
    } else {
      await addUser({
        variables: {name, phone, birthDate, email, password, role},
      });
    }
  };

  return (
    <ScrollView>
      <Text style={styles.formDescription}>Nome completo</Text>
      <TextInput
        style={styles.formInput}
        value={name}
        onChangeText={setName}
        placeholder="Nome Sobrenome"
      />
      <Text style={styles.formDescription}>Telefone</Text>
      <TextInput
        style={styles.formInput}
        value={phone}
        onChangeText={setPhone}
        placeholder="Com DDD, somente números."
      />
      <Text style={styles.formDescription}>Data de nascimento</Text>
      <TextInput
        style={styles.formInput}
        value={birthDate}
        onChangeText={setBirthDate}
        placeholder="AAAA-MM-DD"
      />
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
      <Text style={styles.formDescription}>Cargo</Text>
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
      <TouchableOpacity
        style={styles.formButton}
        disabled={loading}
        onPress={() => {
          handleAddUser();
        }}>
        <Text style={styles.formButtonText}>
          {loading ? 'Carregando' : 'Adicionar usuário'}
        </Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator color="lightgrey" />}
      <Text style={styles.formError}>{error && error.toString()}</Text>
    </ScrollView>
  );
};
