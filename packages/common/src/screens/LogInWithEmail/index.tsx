import React, { useState, useEffect } from 'react';
import { Platform, View, Keyboard } from 'react-native';
import { ActivityLoader, Button } from '../../components';
import { AuthContext } from '../../context/AuthContext';
import { Container, H1, Label, Text, ErrorLabel, Input } from '../../styled';
import formConfig from './formConfig';
import { Routes } from '../../router';

export type FormState = Partial<{ password: string; email: string }>;
export type FormErrorState = { [T in keyof FormState]: string };

const isWeb = Platform.OS == 'web';
export default ({ navigation }) => {
  const { logInWithEmail, state } = React.useContext(AuthContext);
  const [info, setInfo] = useState<FormState>({});
  const [formError, setFormError] = useState<FormErrorState>({});
  // To prevent rendering page, as cannot dispatch { error: null } to connect from here
  const [showingAPIError, setShowingAPIError] = useState<boolean>(false);

  useEffect(() => {
    if (state.isSignedIn) {
      navigation.navigate(Routes.Home.path);
    }
  }, [state.isSignedIn]);

  const login = async () => {
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

    // log in
    let request = { ...info };

    setShowingAPIError(false);
    await logInWithEmail(request);
  };

  if (state.error && !showingAPIError) {
    const error = state.error?.error || state.error;
    let viewError: any = {};

    Object.keys(error).forEach((key) => {
      // does the key match any form field
      if (info[key] !== undefined) {
        viewError[key] = error[key][0];
      }
    });

    if (Object.keys(viewError).length === 0) {
      viewError.other = error.message || 'Something went wrong!!';
    }
    setFormError({ ...formError, ...viewError });
    // Prevent render cause by setFormError
    setShowingAPIError(true);
  }

  return (
    <Container>
      <ActivityLoader animating={state.isLoading && !isWeb} />
      <View style={{ margin: 20, marginTop: 44 }}>
        <View style={{ marginBottom: 20, marginTop: 20 }}>
          <H1>Wanted</H1>
          <Text>Create an account buy and sell services, product, jobs and more.</Text>
        </View>
        <ErrorLabel style={{ fontSize: 16, height: 30 }}>{formError['other']}</ErrorLabel>
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
          </View>
        ))}
        <Button bold title="Log in" onPress={login} titleColor="white" backgroundColor="brown" />
      </View>
    </Container>
  );
};
