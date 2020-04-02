import styled from 'styled-components/native';
import { TextProp } from './types';

export const Container = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 20px 20px;
  justify-content: space-between;
`;

export const H1 = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Title = styled(H1)`
  text-align: center;
`;

export const Text = styled.Text<TextProp>`
  color: black;
  margin-bottom: 4px;
  font-weight: ${(props) => (props.bold ? 'bold' : 'regular')};
`;

export const Label = styled(Text)`
  font-size: 12px;
`;

export const Button = styled.TouchableOpacity<{ backgroundColor: string }>`
  align-items: center;
  justify-content: center;
  height: 40px;
  background-color: ${(props) => props.backgroundColor};
  border-radius: 5px;
  margin-top: 10px;
`;

export const Footer = styled.View`
  display: flex;
  justify-content: flex-end;
`;
