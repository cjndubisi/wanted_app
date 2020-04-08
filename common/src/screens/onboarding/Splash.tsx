import { StackNavigationProp } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import Button from '../../components/Button';
import { RootStackParamList } from '../../router';
import { Container, Footer, Text, Title } from '../../styled';

type SpashNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;
type Prop = {
  navigation: SpashNavigationProp;
};

export default ({ navigation }: Prop) => {
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

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
