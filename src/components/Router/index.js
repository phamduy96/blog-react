import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const PublicRoute = ({ component: Component, ...rest }) => {
    return (
      <Route {...rest} render={props => (
        <Component {...props} />
      )} />
    )
};
export const PrivateRoute = ({ component: Component, ...rest }) => {
    return(
        <Route
        {...rest}
        render={(props) => {
            let componentRender = <Component {...props} />;
            let user = JSON.parse(localStorage.getItem('user'))
            let loginCompoent = <Redirect
                to='/login'
            />
                    if(!user){
                        return loginCompoent
                    }else{
                        return componentRender
                    }
        }}
      />
  
    )                   
};