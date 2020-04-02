import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View } from 'react-native';
import { register } from '../../api/authentication';
import { User } from '../../api/types';
import { RootStackParamList } from '../../router';
import Button from '../../shared/components/Button';
import { Container, Text } from '../../shared/styled';
import formConfig from './formConfig';
import { Input, InputError } from './styled';

type SpashNavigationProp = StackNavigationProp<RootStackParamList, 'EmailAuth'>;
type Prop = {
  navigation: SpashNavigationProp;
};

type FormState = Partial<User & { password: string, confirm_password: string }>;
type FormErrorState = FormState;

export default () => {
  const [info, setInfo] = useState<FormState>({});
  const [formError, setFormError] = useState<FormErrorState>({});
  const signUp = async () => {
    try {
      const request = info;
      delete request.confirm_password;
      const response = await register(request);
    } catch (error) { }
  };

  const validate = () => {
    const errors: FormErrorState = formConfig.reduce((acc, next) => {
      acc[next.key] = next.validation(info[next.key] ?? '');
      return acc;
    }, {});

    if (Object.keys(errors).length > 0) {
      return setFormError(errors);
    }

    signUp();
  };

  return (
    <Container>
      {formConfig.map(input => (
        <View key={`input_${input.key}`}>
          <Text>{input.placeholder}</Text>
          <Input
            key={input.key}
            placeholder={input.placeholder}
            secureTextEntry={input.key.indexOf('password') !== -1}
            onChangeText={(text: string) => {
              setInfo({ ...info, [input.key]: text })
              setFormError({ ...formError, [input.key]: '' })
            }}
            value={info[input.key]}
          />
          <InputError key={`error_${input.key}`} hasError={!!formError[input.key]?.length}>
            {formError[input.key]}
          </InputError>
        </View>)
      )}
      <Button bold
        title='Sign Up with Email'
        onPress={validate}
        titleColor='white'
        backgroundColor='brown' />
    </Container>
  );
};
