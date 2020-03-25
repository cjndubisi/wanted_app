import { AppRegistry, Platform } from 'react-native';
import App from './App';

console.ignoredYellowBox = true;

AppRegistry.registerComponent('Wanted', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('Wanted', { rootTag });
}
