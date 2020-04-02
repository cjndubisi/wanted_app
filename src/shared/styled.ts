import styled from 'styled-components/native';
import { TextProp } from './types';

export const Container = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 20px 20px;
`;

export const H1 = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

export const Title = styled(H1)`
  text-align: center;
`;

export const Text = styled.Text<TextProp>`
  color: black;
  font-weight: ${(props) => (props.bold ? 'bold' : 'regular')};
`;

export const Button = styled.TouchableOpacity<{ backgroundColor: string }>`
  align-items: center;
  justify-content: center;
  height: 40px;
  background-color: ${(props) => props.backgroundColor};
`;

export const Footer = styled.View`
  display: flex;
  justify-content: flex-end;
`;
