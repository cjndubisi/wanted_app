import 'react-native-gesture-handler';

import { AppRegistry } from 'react-native';
import App from './App';
import './index.css';

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

AppRegistry.registerComponent('Wanted', () => App);
AppRegistry.runApplication('Wanted', {
  initialProps: {},
  rootTag: document.getElementById('root'),
});
