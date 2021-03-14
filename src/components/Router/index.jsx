import { Route, Redirect } from 'react-router-dom';
import Cookies from "js-cookie";
let token = Cookies.get('token');


export const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={props => (
      <Component {...props} />
    )} />
  )
};
export const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        let user = JSON.parse(localStorage.getItem("user"))
        let componentRender = <Component {...props} />;
        let loginComponnent = <Redirect
          to='/'
        />
        if(token){
          switch(rest.routeRole){
            case 'admin':
              if(user.role === 'admin'){
                return componentRender
              }else{
                return loginComponnent
              }
            case 'user':
              if(user.role === 'user'){
                return componentRender
              }else{
                return loginComponnent
              }
            default :
                return componentRender
          }
        }else{
          return loginComponnent
        }
      }}
    />
  )
};