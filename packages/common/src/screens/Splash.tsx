import React from 'react';
import Button from '../components/Button';
import { Container, Footer, Text, Title } from '../styled';
import { Routes } from '../router'

export default ({ navigation }) => {
  const emailAuthFlow = () => {
    navigation.navigate(Routes.Email.path);
  };

  const emailLoginFlow = () => {
    navigation.navigate(Routes.EmailLogin.path);
  };
  return (
    <Container style={{ margin: 20, flex: 1, backgroundColor: '#ecf0f1', height: 100 }}>
      <Title>Wanted</Title>
      <Text>Caption To capture buyers and sellers.</Text>
      <Footer>
        <Button
          bold
          backgroundColor="brown"
          title="Log in with Email"
          titleColor="white"
          onPress={emailLoginFlow}
        />

        <Button
          bold
          backgroundColor="brown"
          title="Sign up with Email"
          titleColor="white"
          onPress={emailAuthFlow}
        />
      </Footer>
    </Container>
  );
};
