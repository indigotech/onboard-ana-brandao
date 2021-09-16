import React from 'react';

import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';

const USERS = [
  {
    token: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Taqtile Adm',
    email: 'admin@taqtile.com.br',
  },
  {
    token: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Taqtile Designer',
    email: 'designer@taqtile.com.br',
  },
  {
    token: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Taqtile Intern',
    email: 'intern@taqtile.com.br',
  },
];

const ViewItem = ({name, email}: {name: string; email: string}) => (
  <View style={styles.item}>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.email}>{email}</Text>
  </View>
);

export const UsersScreen = (props: {componentId: string}) => {
  React.useEffect(() => {
    Navigation.mergeOptions(props.componentId, {
      topBar: {
        title: {alignment: 'center', text: 'Usuários'},
      },
    });
  }, []);

  const renderItem = ({item}: {item: any}) => (
    <ViewItem name={item.name} email={item.email} />
  );

  return (
    <View>
      <FlatList
        data={USERS}
        renderItem={renderItem}
        keyExtractor={item => item.token}
      />
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
