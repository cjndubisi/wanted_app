import React from 'react';
import Button from '../components/Button';
import { Container, Footer, Text, Title } from '../styled';

export default ({ navigation }) => {
  const emailAuthFlow = () => {
    navigation.navigate('/authenticating');
  };
  return (
    <Container>
      <Title>Wanted</Title>
      <Text>Caption To capture buyers and sellers.</Text>
      <Footer>
        <Button
          bold
          backgroundColor="brown"
          title="Continue with Email"
          titleColor="white"
          onPress={emailAuthFlow}
        />
      </Footer>
    </Container>
  );
};
