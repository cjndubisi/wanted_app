import { StackNavigationProp } from '@react-navigation/stack';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { RootStackParamList } from '../router';

type SpashNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingFlow'>;
type Prop = {
  navigation: SpashNavigationProp;
};
export default ({ navigation }: Prop) => {
  const { state, tryToLogin } = useContext(AuthContext);
  const { isLoading, isSignedIn } = state;

  useEffect(() => {
    const login = async () => {
      await tryToLogin();
      if (!isSignedIn) {
        navigation.navigate('OnboardingFlow');
      }
    };
    login();
  }, []);

  if (isSignedIn) {
    navigation.navigate('Home');
  }

  return null;
};
