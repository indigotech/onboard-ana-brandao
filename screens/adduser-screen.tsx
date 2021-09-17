import React, {useState} from 'react';

import {Alert, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Navigation} from 'react-native-navigation';

import {styles} from '../features/styles';
import {
  isValidPhone,
  isValidBirthDate,
  isValidEmail,
  isValidRole,
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
  const [role, setRole] = useState('');

  const handleAddUser = () => {
    if (
      name.length === 0 ||
      phone.length === 0 ||
      birthDate.length === 0 ||
      email.length === 0 ||
      role.length === 0
    ) {
      Alert.alert('Campos obrigatórios!', 'Insira todos os dados.', [
        {text: 'Ok'},
      ]);
      return;
    }
    if (!isValidPhone(phone)) {
      Alert.alert('Telefone inválido!', 'Insira um telefone válido.', [
        {text: 'Ok'},
      ]);
      return;
    }
    if (!isValidBirthDate(birthDate)) {
      Alert.alert(
        'Data de nascimento inválida!',
        'Insira uma data de nascimento válida.',
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
    if (!isValidRole(role)) {
      Alert.alert('Cargo inválido!', 'Insira um cargo válido.', [{text: 'Ok'}]);
      return;
    }
  };

  return (
    <View>
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
        placeholder="(XX) XXXX-XXXX"
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
      <Text style={styles.formDescription}>Cargo</Text>
      <TextInput
        style={styles.formInput}
        value={role}
        onChangeText={setRole}
        placeholder="Admin ou User"
      />
      <TouchableOpacity
        style={styles.formButton}
        onPress={() => {
          handleAddUser();
        }}>
        <Text style={styles.formButtonText}>Adicionar usuário</Text>
      </TouchableOpacity>
    </View>
  );
};
