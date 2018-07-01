import { AppContext } from '../App';
import React, { Component } from 'react';

export function withAppContext(Component) {
  return function AppContextedComponent(props) {
    return (
      <AppContext.Consumer>
        {contextValue => <Component {...contextValue} {...props} />}
      </AppContext.Consumer>
    )
  }
}