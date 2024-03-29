import React, { FunctionComponent } from 'react';
import { TextProps } from 'react-native';
import styled from 'styled-components/native';
import { TextProp } from './types';

export const Container = styled.SafeAreaView`
  min-height: 100%;
  max-width: 467px;
  padding: 20px;
  align-items: center;
  background-color: #fff7e6;
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
  ${(props) => (props.bold ? 'font-weight:bold;' : '')};
`;

export const Label = styled(Text)`
  font-size: 12px;
`;

export const InputCaption = styled(Text)`
  margin-top: 4px;
  font-size: 10px;
  color: gray;
`;

export const ErrorLabel = styled.Text`
  font-size: 12px;
  color: red;
  height: 13px;
  margin-bottom: 6px;
`;

export const Input = styled.TextInput`
  height: 40px;
  color: black;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 14px;
  border-radius: 5px;
  background-color: white;
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
  flex: 1;
  align-self: stretch;
  justify-content: flex-end;
  margin: 20px;
`;
