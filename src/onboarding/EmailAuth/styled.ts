import styled from 'styled-components/native';

export const InputError = styled.Text<{ hasError: boolean }>`
  font-size: 12px;
  color: red;
  height: ${props => (props.hasError ? 13 : 0)}px;
  margin-bottom: 6px;
`;

export const Input = styled.TextInput`
  height: 40px;
  color: black;
  border-width: 1px;
  padding-left: 10px;
  padding-right: 10;
  font-size: 14px;
`;
