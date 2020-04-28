import React, { useState, useEffect } from 'react';
import { Platform, View, Keyboard } from 'react-native';
import { User } from '../../api/types';
import { ActivityLoader, Button, DismissKeyboard } from '../../components';
import { AuthContext } from '../../context/AuthContext';
import { Container, H1, InputCaption, Label, Text } from '../../styled';
import formConfig from './formConfig';
import { ErrorLabel, Input } from './styled';

export type FormState = Partial<User & { password: string; confirm_password: string }>;
export type FormErrorState = { [T in keyof FormState]: string };

console.disableYellowBox = true;
const isWeb = Platform.OS == 'web';
export default ({ navigation }) => {
  const { signUpWithEmail, state } = React.useContext(AuthContext);
  const [info, setInfo] = useState<FormState>({});
  const [formError, setFormError] = useState<FormErrorState>({});
  // To prevent rendering page, as cannot dispatch { error: null } to contect from here
  const [showingAPIError, setShowingAPIError] = useState<boolean>(false);

  useEffect(() => {
    if (state.isSignedIn) {
      navigation.navigate('/board');
    }
  }, [state.isSignedIn]);

  const signUp = async () => {
    Keyboard.dismiss();
    const errors: FormErrorState = formConfig.reduce((acc, next) => {
      const error = next.validation(info);
      // update empty object only if error exist
      if (error !== '') {
        acc[next.key as keyof FormErrorState] = error;
      }
      return acc;
    }, {} as FormErrorState);

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
    let viewError = { other: '' };
    Object.keys(error).forEach((key) => {
      // does the key match any form field
      if (info[key] !== undefined) {
        viewError[key] = error[key][0];
      }
    });

    if (Object.keys(viewError).length === 0) {
      viewError.other = error?.[0] ?? error.message;
    }
    setFormError({ ...formError, ...viewError });
    // Prevent render cause by setFormError
    setShowingAPIError(true);
  }

  return (
    <Container>
      <ActivityLoader animating={state.isLoading && !isWeb} />
      <DismissKeyboard>
        <View style={{ marginBottom: 20, marginTop: 20 }}>
          <View>
            <H1>Wanted</H1>
            <Text>Create an account buy and sell services, product, jobs and more.</Text>
          </View>
          <ErrorLabel>{}</ErrorLabel>
          {formConfig.map((input) => (
            <View style={{ marginBottom: 12 }} key={`input_${input.key}`}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}
              >
                <Label bold>{input.placeholder}</Label>
                <ErrorLabel accessibilityLabel={`error_${input.key}`} key={`error_${input.key}`}>
                  {formError[input.key]}
                </ErrorLabel>
              </View>
              <Input
                key={input.key}
                accessibilityLabel={input.key}
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
      </DismissKeyboard>
    </Container>
  );
};
