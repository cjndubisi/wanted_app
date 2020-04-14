import React from 'react';
import { Text } from 'react-native';
import { Container } from '../styled';

export default () => {
  console.log('got here');

  return (
    <Container style={{ margin: 20 }}>
      <Text>Board</Text>
    </Container>
  );
};
