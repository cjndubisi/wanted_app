import styled from 'styled-components/native';

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

export const Text = styled.Text``;

export const Button = styled.TouchableHighlight`
  align-items: center;
  justify-content: center;
  height: 40px;
`;

export const Footer = styled.View`
  display: flex;
  justify-content: flex-end;
`;
