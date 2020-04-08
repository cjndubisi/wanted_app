import { StackNavigationProp } from '@react-navigation/stack';
import React, { useLayoutEffect } from 'react';
import { RootStackParamList } from '../router';
import { Container } from '../styled';

type SpashNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type Prop = {
  navigation: SpashNavigationProp;
};

export default ({ navigation }: Prop) => {
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  return <Container style={{ margin: 20 }}></Container>;
};
