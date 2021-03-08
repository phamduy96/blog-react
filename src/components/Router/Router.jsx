import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const PublicRoute = ({ component: Component, ...rest }) => {
    return (
      <Route {...rest} render={props => (
        <Component {...props} />
      )} />
    )
};
export const PrivateRoute = ({ component: Component, ...rest }) => {
    let user = localStorage
    return(
      <Route {...rest} render={props => (
        <Component {...props} />
      )} />  
    )                      
};