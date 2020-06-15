import React, { useEffect, useContext } from 'react';
import Button from '../components/Button';
import { Container, Footer, Text, Title } from '../styled';
import { Routes, ScreenProps } from '../router';
import { AuthContext } from '../context/AuthContext';
import { ActivityLoader } from '../components';
import { Platform } from 'react-native';

const isWeb = Platform.OS == 'web';

export default ({ navigation }: ScreenProps) => {
  const { state } = React.useContext(AuthContext);

  const emailAuthFlow = () => {
    navigation.navigate(Routes.EmailSignup.path);
  };

  const emailLoginFlow = () => {
    navigation.navigate(Routes.EmailLogin.path);
  };

  const { loginWithFacebook } = useContext(AuthContext);

  return (
    <Container>
      <ActivityLoader animating={state.isLoading && !isWeb} />
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
        <Button
          bold
          backgroundColor="brown"
          title="Sign in with Facebook"
          titleColor="white"
          onPress={loginWithFacebook}
        />
      </Footer>
    </Container>
  );
};
