import React from 'react';
import Button from '../components/Button';
import { Container, Footer, Text, Title } from '../styled';

export default () => {
  return (
    <Container style={{ margin: 20, flex: 1, backgroundColor: '#ecf0f1', height: 100 }}>
      <Title>Wanted</Title>
      <Text>Caption To capture buyers and sellers.</Text>
      <Footer>
        <Button bold backgroundColor="brown" title="Continue with Email" titleColor="white" />
      </Footer>
    </Container>
  );
};
