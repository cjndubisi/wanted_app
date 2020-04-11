import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler'; // leave at the top of the file (https://reactnavigation.org/docs/getting-started)
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
