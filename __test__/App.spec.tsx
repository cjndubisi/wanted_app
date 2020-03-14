import 'react-native';
import React from 'react';
import { create } from 'react-test-renderer';
import App from '../App';

it('renders correctly', () => {
  const tree = create(<App />).toJSON();

  expect(tree).toMatchSnapshot();
});
