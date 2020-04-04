import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { RootStackParamList } from './router';
import { Container } from './shared/styled';

type SpashNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type Prop = {
  navigation: SpashNavigationProp;
};

export default ({ navigation }: Prop) => {
  navigation.setOptions({ headerShown: false });

  return <Container style={{ margin: 20 }}></Container>;
};
