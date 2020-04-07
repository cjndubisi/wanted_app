import { StackNavigationProp } from '@react-navigation/stack';
import React, { useLayoutEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { RootStackParamList } from '../../../router';
import { User } from '../../../shared/api/types';
import { ActivityLoader, Button } from '../../../shared/components';
import { AuthContext } from '../../../shared/context/AuthContext';
import { Container, H1, InputCaption, Label, Text } from '../../../shared/styled';
import formConfig from './formConfig';
import { ErrorLabel, Input } from './styled';

type SpashNavigationProp = StackNavigationProp<RootStackParamList, 'EmailAuth'>;
type FormState = Partial<User & { password: string; confirm_password: string }>;
type FormErrorState = FormState;

const isWeb = Platform.OS == 'web';
export default ({ navigation }: { navigation: SpashNavigationProp }) => {
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: Platform.OS != 'web' });
  }, [navigation]);

  const { signUpWithEmail, state } = React.useContext(AuthContext);
  const [info, setInfo] = useState<FormState>({});
  const [formError, setFormError] = useState<FormErrorState>({});
  // To prevent rendering page, as cannot dispatch { error: null } to contect from here
  const [showingAPIError, setShowingAPIError] = useState<boolean>(false);

  const signUp = async () => {
    const errors: FormErrorState = formConfig.reduce((acc, next) => {
      const error = next.validation(info);
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
  if (state.isSignedIn) {
    navigation.navigate('Home');
  }

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
      <View style={{ margin: 20, marginTop: 44 }}>
        <View style={{ marginBottom: 20, marginTop: 20 }}>
          <H1>Wanted</H1>
          <Text>Create an account buy and sell services, product, jobs and more.</Text>
        </View>
        <ErrorLabel>{}</ErrorLabel>
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
              <ErrorLabel key={`error_${input.key}`}>{formError[input.key]}</ErrorLabel>
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
