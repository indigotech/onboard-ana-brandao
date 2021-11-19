import {Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components';

export const Button = styled(TouchableOpacity)`
  background-color: lightseagreen;
  border-radius: 12px;
  width: 90%;
  height: 48px;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-top: 32px;
  margin-bottom: 8px;
  padding: 8px;
`;

export const ButtonText = styled(Text)`
  font-size: 16px;
  font-weight: normal;
  color: white;
`;
