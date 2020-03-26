import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';

import { RootStackParamList } from '../router';
import { Container } from '../styles';
import { register } from '../api';

type SpashNavigationProp = StackNavigationProp<RootStackParamList, 'EmailAuth'>;
type Prop = {
  navigation: SpashNavigationProp;
};

const emailInfo = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: '',
};
const InputError = styled.Text`
  font-size: 12px;
  color: red;
  height: 13px;
  margin-bottom: 6px;
`;

const Input = styled.TextInput`
  height: 40;
  color: black;
  border-width: 1;
  padding-left: 10;
  padding-right: 10;
  font-size: 14;
  margin-bottom: 10;
`;

const fieldsConfigurationOrder = [
  {
    placeholder: 'First Name',
    key: 'first_name',
    validation: (value): string => {
      const firstValid = value.length > 3;
      return firstValid ? '' : 'First name is too short';
    },
  },
  {
    placeholder: 'Last Name',
    key: 'last_name',
    validation: (value): string => {
      const firstValid = value.length > 3;
      return firstValid ? '' : 'Last name is too short';
    },
  },
  {
    placeholder: 'Email',
    key: 'email',
    validation: (value): string => {
      const emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      return emailValid ? '' : 'Invalid email';
    },
  },
  {
    placeholder: 'Password',
    key: 'password',
    validation: (value): string => {
      const passwordValid = value.length >= 6;
      return passwordValid ? '' : 'Password is too short';
    },
  },
  {
    placeholder: 'Confirm Password',
    key: 'confirm_password',
    validation: (value): string => {
      const passwordValid = value.length > 6;
      return passwordValid ? '' : 'Password does not match';
    },
  },
];

type ButtonProps = {
  title: string;
  onPress(): void;
};

const Button = ({ title, onPress }: ButtonProps) => (
  <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
    <Text>{title}</Text>
  </TouchableOpacity>
);

export default () => {
  const [info, setInfo] = useState<typeof emailInfo>(emailInfo);
  const [formError, setFormError] = useState<typeof emailInfo | {}>(emailInfo);
  const signUp = async () => {
    try {
      const request = info;
      delete request.confirm_password;
      const response = await register(request);
      console.log(response);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  const validate = () => {
    const errors: typeof emailInfo | {} = fieldsConfigurationOrder.reduce((acc, next) => {
      const error = next.validation(info[next.key]);
      if (error !== '') {
        acc[next.key] = next.validation(info[next.key]);
      }
      return acc;
    }, {});

    if (Object.keys(errors).length > 0) {
      return setFormError(errors);
    }

    signUp();
  };

  const inputs = fieldsConfigurationOrder.map(input => (
    <View key={`input_${input.key}`}>
      <InputError key={`error_${input.key}`}>{formError[input.key]}</InputError>
      <Input
        key={input.key}
        placeholder={input.placeholder}
        secureTextEntry={input.key.indexOf('password') !== -1}
        onChangeText={(text: string) => setInfo({ ...info, [input.key]: text })}
        value={info[input.key]}
      />
    </View>
  ));

  return (
    <Container>
      {inputs}
      <Button title="Sign Up with Email" onPress={validate} />
    </Container>
  );
};
