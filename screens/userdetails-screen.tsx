import React from 'react';

import {useQuery} from '@apollo/client';
import {View, Text} from 'react-native';
import {Navigation} from 'react-native-navigation';

import {styles} from '../features/styles';
import {USER_QUERY, UserQuery} from '../features/userdetails-features';

export const UserDetailsScreen = (props: {componentId: string; id: string}) => {
  React.useEffect(() => {
    Navigation.mergeOptions(props.componentId, {
      topBar: {
        title: {alignment: 'center', text: 'Detalhes'},
      },
    });
  }, [props.componentId]);

  const {data, error} = useQuery<UserQuery>(USER_QUERY, {
    variables: {
      id: props.id,
    },
  });

  return (
    <View style={styles.item}>
      <Text style={styles.primary}>{data?.user.name}</Text>
      <View style={styles.row}>
        <Text style={styles.secondary}>Contato:</Text>
        <Text style={styles.tertiary}>{data?.user.phone}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.secondary}>Data de nascimento:</Text>
        <Text style={styles.tertiary}>{data?.user.birthDate}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.secondary}>E-mail:</Text>
        <Text style={styles.tertiary}>{data?.user.email}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.secondary}>Cargo:</Text>
        <Text style={styles.tertiary}>{data?.user.role}</Text>
      </View>
      <Text style={styles.formError}>{error && error.toString()}</Text>
    </View>
  );
};
