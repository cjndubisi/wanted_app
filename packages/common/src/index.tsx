import {
  NavigationContainer,
  NavigationContainerRef,
  useLinking,
  InitialState,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { RootStackParamList, Routes as Screens } from './router';
import { Platform, AsyncStorage } from 'react-native';

const Stack = createStackNavigator<RootStackParamList>();
export default () => {
  // Start: WEBURL history and restore initial state on reload
  const containerRef = React.useRef<NavigationContainerRef>();
  const { getInitialState } = useLinking(containerRef, {
    prefixes: ['/'],
    config: {
      Root: {
        path: '',
        initialRouteName: 'Splash',
        screens: Object.keys(Screens).reduce<{ [key: string]: string }>(
          (acc, name) => {
            // Convert screen names such as SimpleStack to kebab case (simple-stack)
            acc[name] = name
              .replace(/([A-Z]+)/g, '-$1')
              .replace(/^-/, '')
              .toLowerCase();

            return acc;
          },
          { Splash: '' }
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
    <AuthProvider>
      <NavigationContainer ref={containerRef} initialState={initialState}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {(Object.keys(Screens) as (keyof typeof Screens)[]).map((name) => (
            <Stack.Screen key={name} name={name} component={Screens[name].component} />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};
