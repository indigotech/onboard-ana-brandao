import {Text} from 'react-native';
import styled from 'styled-components';

export const H1 = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  color: #000000;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

export const H2 = styled(Text)`
  font-size: 20px;
  font-weight: normal;
  color: #000000;
`;

export const H3 = styled(Text)`
  font-size: 16px;
  font-weight: normal;
  color: #000000;
  margin-top: 12px;
  margin-right: 4px;
`;

export const ColoredH3 = styled(H3)`
  color: lightseagreen;
`;
