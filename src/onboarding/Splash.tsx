import React from 'react';
import styled from 'styled-components/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../router';
import { Container, Title, Text, Footer, Button } from '../styles';

type SpashNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;
type Prop = {
  navigation: SpashNavigationProp;
};

export default ({ navigation }: Prop) => (
  <Container>
    <Title>Wanted</Title>
    <Text>Caption To capture buyers and sellers.</Text>
    <Footer>
      <AuthButton
        bold
        backgroundColor="brown"
        title="Continue with Email"
        onPress={() => navigation.navigate('EmailAuth')}
      />
    </Footer>
  </Container>
);

interface AuthButtonProp {
  bold: boolean;
  title: string;
  backgroundColor: string;
  onPress(): void;
}

const AuthButton = ({ bold, title, backgroundColor, onPress }: AuthButtonProp) => (
  <AuthButtonContainer onPress={onPress} backgroundColor={backgroundColor}>
    <EmbeddedText bold={bold ? 1 : 0}>{title}</EmbeddedText>
  </AuthButtonContainer>
);

interface EmbeddedTextProp {
  bold: 0 | 1;
}

export const EmbeddedText = styled.Text`
  color: white;
  font-weight: ${(props: EmbeddedTextProp) => (props.bold ? 'bold' : 'regular')};
`;

export const AuthButtonContainer = styled(Button)`
  background-color: ${(props: AuthButtonProp) => props.backgroundColor};
`;
