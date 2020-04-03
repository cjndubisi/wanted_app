import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Platform, View } from 'react-native';
import { RootStackParamList } from '../../../router';
import { User } from '../../../shared/api/types';
import Button from '../../../shared/components/Button';
import { AuthContext } from '../../../shared/context/AuthContext';
import { Container, H1, InputCaption, Label, Text } from '../../../shared/styled';
import formConfig from './formConfig';
import { Input, InputError } from './styled';

type SpashNavigationProp = StackNavigationProp<RootStackParamList, 'EmailAuth'>;
type FormState = Partial<User & { password: string; confirm_password: string }>;
type FormErrorState = FormState;

export default ({ navigation }: { navigation: SpashNavigationProp }) => {
  navigation.setOptions({
    headerShown: Platform.OS != 'web',
  });

  const { signUpWithEmail, state } = React.useContext(AuthContext);
  const [info, setInfo] = useState<FormState>({});
  const [formError, setFormError] = useState<FormErrorState>({});
  // To prevent rendering page, as cannot dispatch { error: null } to contect from here
  const [showingAPIError, setShowingAPIError] = useState<boolean>(false);

  const signUp = async () => {
    const errors: FormErrorState = formConfig.reduce((acc, next) => {
      const error = next.validation(info[next.key] ?? '');
      // update empty object only if error exist
      if (error !== '') {
        acc[next.key] = error;
      }
      return acc;
    }, {});

    if (Object.keys(errors).length > 0) {
      return setFormError(errors);
    }

    // sign up
    let request = { ...info };
    delete request.confirm_password;

    setShowingAPIError(false);
    await signUpWithEmail(request);
  };

  if (state.error && !showingAPIError) {
    const error = state.error;
    let viewError = {};
    Object.keys(error).forEach((key) => {
      // does the key match any form field
      if (info[key] !== undefined) {
        viewError[key] = error[key][0];
      }
    });

    if (Object.keys(viewError).length !== 0) {
      setFormError({ ...formError, ...viewError });
    }
    setShowingAPIError(true);
  }

  return (
    <Container style={{ marginTop: 44 }}>
      <View>
        <View style={{ marginBottom: 20, marginTop: 20 }}>
          <H1>Wanted</H1>
          <Text>Create an account buy and sell services, product, jobs and more.</Text>
        </View>

        {formConfig.map((input) => (
          <View style={{ marginBottom: 12 }} key={`input_${input.key}`}>
            <View
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}
            >
              <Label bold>{input.placeholder}</Label>
              <InputError key={`error_${input.key}`} hasError={!!formError[input.key]?.length}>
                {formError[input.key]}
              </InputError>
            </View>
            <Input
              key={input.key}
              secureTextEntry={input.key.indexOf('password') !== -1}
              onChangeText={(text: string) => {
                setInfo({ ...info, [input.key]: text });
                setFormError({ ...formError, [input.key]: '' });
              }}
              value={info[input.key] || ''}
            />
            {input.key === 'password' ? (
              <InputCaption>
                {'Requires at least an Uppercase letter, a symbol and a number'}
              </InputCaption>
            ) : null}
          </View>
        ))}
        <Button
          bold
          title="Sign up with email"
          onPress={signUp}
          titleColor="white"
          backgroundColor="brown"
        />
      </View>
    </Container>
  );
};
