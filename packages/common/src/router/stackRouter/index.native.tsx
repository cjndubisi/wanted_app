export { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '..';

const Router = () => {
  const Stack = createStackNavigator<RootStackParamList>();

  return Stack;
};
export const { Navigator, Screen } = Router();
