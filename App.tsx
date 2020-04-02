import {
  InitialState,
  NavigationContainer,
  NavigationContainerRef,
  useLinking,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Linking } from 'expo';
import React from 'react';
import { AsyncStorage, Platform } from 'react-native';
import 'react-native-gesture-handler'; // leave at the top of the file (https://reactnavigation.org/docs/getting-started)
import OnboardingStack from './src/onboarding';

const SCREENS = { OnboardingStack: { component: OnboardingStack } };
type RootStackParamList = {
  OnboardingStack: undefined;
} & {
  [P in keyof typeof SCREENS]: undefined;
};
const Stack = createStackNavigator<RootStackParamList>();
export default function App() {
  // Start: WEBURL history and restore initial state on reload
  const containerRef = React.useRef<NavigationContainerRef>();
  const { getInitialState } = useLinking(containerRef, {
    prefixes: [Linking.makeUrl('/')],
    config: {
      Root: {
        path: '',
        initialRouteName: 'OnboardingStack',
        screens: Object.keys(SCREENS).reduce<{ [key: string]: string }>(
          (acc, name) => {
            // Convert screen names such as SimpleStack to kebab case (simple-stack)
            acc[name] = name
              .replace(/([A-Z]+)/g, '-$1')
              .replace(/^-/, '')
              .toLowerCase();

            return acc;
          },
          { OnboardingStack: '' }
        ),
      },
    },
  });
  const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE';

  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState<InitialState | undefined>();
  React.useEffect(() => {
    const restoreState = async () => {
      try {
        let state = await getInitialState();

        if (Platform.OS !== 'web' && state === undefined) {
          const savedState = await AsyncStorage.getItem(NAVIGATION_PERSISTENCE_KEY);
          state = savedState ? JSON.parse(savedState) : undefined;
        }

        if (state !== undefined) {
          setInitialState(state);
        }
      } finally {
        setIsReady(true);
      }
    };

    restoreState();
  }, [getInitialState]);

  if (!isReady) {
    return null;
  }
  // END: WEBURL

  return (
    <NavigationContainer ref={containerRef} initialState={initialState}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {(Object.keys(SCREENS) as (keyof typeof SCREENS)[]).map((name) => (
          <Stack.Screen key={name} name={name} component={SCREENS[name].component} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
