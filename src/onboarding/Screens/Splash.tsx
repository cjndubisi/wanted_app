import { StackNavigationProp } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import { RootStackParamList } from '../../router';
import Button from '../../shared/components/Button';
import { AuthContext } from '../../shared/context/AuthContext';
import { Container, Footer, Text, Title } from '../../shared/styled';

type SpashNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;
type Prop = {
  navigation: SpashNavigationProp;
};

export default ({ navigation }: Prop) => {
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  
  const { state } = React.useContext(AuthContext);
  if (state.isSignedIn) {
    navigation.navigate('Home');
  }
  return (
    <Container style={{ margin: 20 }}>
      <Title>Wanted</Title>
      <Text>Caption To capture buyers and sellers.</Text>
      <Footer>
        <Button
          bold
          backgroundColor="brown"
          title="Continue with Email"
          titleColor="white"
          onPress={() => navigation.navigate('EmailAuth')}
        />
      </Footer>
    </Container>
  );
};
