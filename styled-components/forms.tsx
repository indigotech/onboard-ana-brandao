import React, {useState} from 'react';

import {Text, View, TextInput} from 'react-native';
import styled from 'styled-components';

interface Validation {
  isValid: boolean;
}

export const FormLabel = styled(Text)<Validation>`
  font-size: 12px;
  font-weight: normal;
  color: ${props => (props.isValid ? '#777777' : 'red')};
  margin-top: 16px;
  margin-horizontal: 5%;
`;

export const FormInput = styled(TextInput)<Validation>`
  border-color: ${props => (props.isValid ? '#777777' : 'red')};
  border-radius: 12px;
  border-width: 1px;
  width: 90%;
  height: 48px;
  align-self: center;
  margin-top: 12px;
  padding: 8px;
`;

export const FormCaption = styled(Text)`
  font-size: 12px;
  font-weight: normal;
  color: red;
  margin-top: 8px;
  margin-horizontal: 5%;
`;

export const Form = (props: {
  label: string;
  autoCapitalize: 'none' | 'sentences' | 'words' | 'characters' | undefined;
  value: string;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChangeText: ((text: string) => void) | undefined;
  placeholder: string;
  secureTextEntry: boolean;
  keyboardType: any | undefined;
  onEndEditing: any | undefined;
}) => {
  const [isValid, setIsValid] = useState(true);

  return (
    <View>
      <FormLabel isValid={isValid}>{props.label}</FormLabel>
      <FormInput
        autoCapitalize={props.autoCapitalize}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        onEndEditing={() => {
          setIsValid(props.onEndEditing);
        }}
        isValid={isValid}
      />
      <FormCaption>{!isValid && 'Confira o formato de seus dados'}</FormCaption>
    </View>
  );
};

export const FormError = styled(Text)`
  font-size: 12px;
  font-weight: normal;
  color: red;
  text-align: center;
  margin-top: 8px;
`;
