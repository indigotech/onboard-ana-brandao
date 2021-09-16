import React from 'react';

import {useQuery} from '@apollo/client';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';

import {USERS_QUERY} from '../features/users-features';

interface User {
  id: string;
  name: string;
  email: string;
}

const ViewItem = ({name, email}: {name: string; email: string}) => (
  <View style={styles.item}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.email}>{email}</Text>
  </View>
);
const renderItem = ({item}: {item: User}) => (
  <ViewItem name={item.name} email={item.email} />
);

export const UsersScreen = (props: {componentId: string}) => {
  React.useEffect(() => {
    Navigation.mergeOptions(props.componentId, {
      topBar: {
        title: {alignment: 'center', text: 'Usuários'},
      },
    });
  }, [props.componentId]);

  const {data} = useQuery(USERS_QUERY, {});

  return (
    <View>
      <FlatList
        data={data?.users.nodes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Text>Users Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    padding: 20,
  },
  name: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  email: {
    fontSize: 15,
    color: 'lightseagreen',
  },
});
