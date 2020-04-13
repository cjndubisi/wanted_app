import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Screen = (props) => {
  return (
    <Route
      {...props}
      render={({ history, ...other }) => {
        history.navigate = history.push;
        const navigation = history;

        return <props.component {...other} navigation={navigation} />;
      }}
    />
  );
};

export { BrowserRouter as NavigationContainer, Switch as Navigator, Screen };
