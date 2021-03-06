import React from "react";
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom";
import NotFound from "./components/notFound/NotFound.jsx"
import Login from "./views/Login/Login"
import Users from "./views/users/Users.jsx"
import UpdateBlog from "./views/updateBlog/UpdateBlog.jsx"
import DetailBloog from "./views/blog/DetailBlog.jsx"
import UpdateAvarta from "./views/users/UpdateAvarta.jsx"
import UpdatePhone from "./views/users/UpdatePhone.jsx"
import LoginAdmin from "./views/Login/LoginAdmin"
import Blog from "./views/blog/Blog";
import BlogSelect from "./views/blog/BlogSelect"
import './App.css';
import { PrivateRoute, PublicRoute } from './components/Router/index.jsx';
require('dotenv').config()
function App() {
  return (
    <Router>
        <Switch>
          <PublicRoute exact={true}  path="/" component={Login}/>
          <PublicRoute  path="/login-admin" component={LoginAdmin}/>

          <PrivateRoute routeRole='admin' exact={true}  path="/user" component={Users}/>
          <PrivateRoute routeRole='admin' exact={true}  path="/addNewBlog" component={UpdateBlog}/>
          <PrivateRoute path='/blog' component={Blog}/>
          <PrivateRoute path='/blogs/:id' component={BlogSelect}/>
          <PrivateRoute path='/updateAvatar' component={UpdateAvarta}/>
          <PrivateRoute path='/updatePhone' component={UpdatePhone}/>
          <PrivateRoute path='/detailBlog/:id' component={DetailBloog}/>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
