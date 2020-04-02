import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { RootStackParamList } from '../router';
import Button from '../shared/components/Button';
import { Container, Footer, Text, Title } from '../shared/styled';

type SpashNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;
type Prop = {
  navigation: SpashNavigationProp;
};

export default ({ navigation }: Prop) => (
  <Container>
    <Title>Wanted</Title>
    <Text>Caption To capture buyers and sellers.</Text>
    <Footer>
      <Button
        bold
        backgroundColor="brown"
        title="Continue with Email"
        titleColor='white'
        onPress={() => navigation.navigate('EmailAuth')}
      />
    </Footer>
  </Container>
);

