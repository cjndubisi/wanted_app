import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, RouteProps } from 'react-router-dom';

const Screen = ({ component: Component, ...props }) => {
  return (
    <Route
      {...props}
      render={({ history, ...rest }) => {
        const navigation = {
          navigate: history.push,
          ...history,
        };
        return <Component {...rest} navigation={navigation} />;
      }}
    />
  );
};

export { BrowserRouter as NavigationContainer, Switch as Navigator, Screen };
