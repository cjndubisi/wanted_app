import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('wanted', () => App);

const rootTag = document.getElementById('root') || document.getElementById('main');
AppRegistry.runApplication('Wanted', { rootTag });
