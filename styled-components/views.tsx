import React from 'react';

import {View} from 'react-native';
import styled from 'styled-components';

import {ColoredH3, H3} from './heading';

export const Container = styled(View)`
  flex: 1;
  margin-horizontal: 5%
  margin-top: 24px;
`;

export const RowView = styled(View)`
  flex-direction: row;
`;

export const InfoView = (props: {label: string; info: string | undefined}) => {
  return (
    <View>
      <RowView>
        <H3>{props.label}</H3>
        <ColoredH3>{props.info}</ColoredH3>
      </RowView>
    </View>
  );
};
