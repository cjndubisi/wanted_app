import React from 'react';
import styled from 'styled-components/native';

const Text = styled.Text``;
const FilterInputError = ({
  hasError,
  ...rest
}: {
  hasError: boolean;
  // eslint-disable-next-line react/jsx-props-no-spreading
}) => <Text {...rest} />;

export const InputError = styled(FilterInputError)`
  font-size: 12px;
  color: red;
  height: ${(props) => (props.hasError ? 13 : 0)}px;
  margin-bottom: 6px;
`;

export const Input = styled.TextInput`
  height: 40px;
  color: black;
  padding-left: 10px;
  padding-right: 10;
  font-size: 14px;
  border-radius: 5px;
  background-color: white;
`;
