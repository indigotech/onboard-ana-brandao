import React from 'react';

import {useQuery} from '@apollo/client';
import {Navigation} from 'react-native-navigation';

import {USER_QUERY, UserQuery} from '../features/userdetails-features';
import {FormError} from '../styled-components/forms';
import {H2} from '../styled-components/heading';
import {Container, InfoView} from '../styled-components/views';

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
    <Container>
      <H2>{data?.user.name}</H2>
      <InfoView label="Contato:" info={data?.user.phone} />
      <InfoView label="Data de nascimento:" info={data?.user.birthDate} />
      <InfoView label="E-mail:" info={data?.user.email} />
      <InfoView label="Cargo:" info={data?.user.role} />
      <FormError>{error && error.toString()}</FormError>
    </Container>
  );
};
