import React from 'react';

import {useQuery} from '@apollo/client';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {FAB} from 'react-native-paper';

import {styles} from '../features/styles';
import {
  USERS_QUERY,
  User,
  UsersQuery,
  PageInput,
} from '../features/users-features';

export const UsersScreen = (props: {componentId: string}) => {
  React.useEffect(() => {
    Navigation.mergeOptions(props.componentId, {
      topBar: {
        title: {alignment: 'center', text: 'Usuários'},
      },
    });
  }, [props.componentId]);

  const renderItem = ({item}: {item: User}) => (
    <TouchableOpacity
      onPress={() => {
        Navigation.push(props.componentId, {
          component: {
            name: 'UserDetails',
            passProps: {
              id: item.id,
            },
            id: item.id,
          },
        });
      }}>
      <View style={styles.item}>
        <Text style={styles.primary}>{item.name}</Text>
        <Text style={styles.secondary}>{item.email}</Text>
      </View>
    </TouchableOpacity>
  );

  const {data, fetchMore} = useQuery<UsersQuery, PageInput>(USERS_QUERY, {
    variables: {
      offset: 0,
      limit: 10,
    },
  });

  const onEndReached = async () => {
    if (data?.users.pageInfo.hasNextPage) {
      await fetchMore({
        variables: {
          offset: data?.users.nodes.length,
        },
        updateQuery: (previousResult, {fetchMoreResult}): UsersQuery => {
          const newResult = fetchMoreResult?.users.nodes ?? [];
          return {
            ...previousResult,
            users: {
              ...previousResult.users,
              nodes: [...previousResult.users.nodes, ...newResult],
            },
          };
        },
      });
    }
  };

  return (
    <View>
      <FlatList
        data={data?.users.nodes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onEndReached={onEndReached}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => {
          Navigation.push(props.componentId, {
            component: {
              name: 'AddUser',
            },
          });
        }}
      />
    </View>
  );
};
