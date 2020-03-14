import 'react-native';
import React from 'react';
import App from './App';

import { create } from 'react-test-renderer';

it('renders correctly', () => {
  const tree = create(() => <App />).toJSON();

  expect(tree).toMatchSnapshot();
});
