import React, { FunctionComponent } from 'react';
import { TextProps } from 'react-native';
import styled from 'styled-components/native';
import { TextProp } from './types';

export const Container = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-self: center;
  max-width: 467px;
`;

export const H1 = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Title = styled(H1)`
  text-align: center;
`;

const FText = styled.Text<TextProp>``;
const FilterText: FunctionComponent<TextProp & TextProps> = ({ bold, ...rest }: TextProp) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <FText {...rest} />
);

export const Text = styled(FilterText)`
  color: black;
  margin-bottom: 4px;
  /* font-weight: ${(props) => (props.bold ? 'bold' : 'regular')}; */
`;

export const Label = styled(Text)`
  font-size: 12px;
`;

export const InputCaption = styled(Text)`
  margin-top: 4px;
  font-size: 10px;
  color: gray;
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
