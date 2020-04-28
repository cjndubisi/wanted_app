import { NavigationContainerRef, useLinking, InitialState } from '@react-navigation/native';
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { Routes as ROUTES, Stack } from './router';
import { Platform, AsyncStorage } from 'react-native';

export default () => {
  // Start: WEBURL history and restore initial state on reload
  const containerRef = React.useRef<NavigationContainerRef>();
  const { getInitialState } = useLinking(containerRef, {
    prefixes: ['/'],
    config: {
      Root: {
        path: '',
        initialRouteName: '/authenticating',
        screens: Object.keys(ROUTES).reduce<{ [key: string]: string }>(
          (acc, name) => {
            acc[name] = ROUTES[name].path;
            return acc;
          },
          { Splash: '/' }
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
      <Stack.NavigationContainer initialState={initialState}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {(Object.keys(ROUTES) as (keyof typeof ROUTES)[]).map((name) => (
            <Stack.Screen key={name} name={ROUTES[name].path} exact {...ROUTES[name]} />
          ))}
        </Stack.Navigator>
      </Stack.NavigationContainer>
    </AuthProvider>
  );
};
