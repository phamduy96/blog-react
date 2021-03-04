import React from "react";
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom";
import NotFound from "./components/notFound/NotFound.jsx"
import Login from "./views/Login/Login"
import Users from "./views/users/Users.jsx"
import Blog from "./views/blog/Blog.jsx";
import UpdateBlog from "./views/updateBlog/UpdateBlog.jsx"
import DetailBloog from "./views/blog/DetailBlog.jsx"
import './App.css';
function App() {
  return (
    <Router>
        <Switch>
          <Route path="/user">
            <Users></Users>
          </Route>
          <Route path="/blog">
            <Blog></Blog>
          </Route>
          <Route path="/detailBlog">
            <DetailBloog></DetailBloog>
          </Route>
          <Route path="/updateBlog">
            <UpdateBlog></UpdateBlog>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
