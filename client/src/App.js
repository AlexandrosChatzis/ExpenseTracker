import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AppNavbar from "./components/AppNavbar";

import { Provider } from "react-redux";
import store from "./store";
import Register from "./components/Register";
import ForgottenPW from "./components/ForgottenPW";
import Login from "./components/Login";
import Home from "./components/Home";
import ExpensesTracker from "./components/ExpensesTracker";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
function App() {
  const guestLinks = (
    <Fragment>
      <Route path="/" exact component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/forgot" component={ForgottenPW} />
    </Fragment>
  );
  const authLinks = (
    <Fragment>
      <Route path="/" exact component={ExpensesTracker} />

      {/* <Route path="/expenses" exact component={ExpensesTracker} /> */}
    </Fragment>
  );
  const authredirect = (
    <Fragment>
      <Redirect to="/expenses" />
    </Fragment>
  );
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Switch>
            {localStorage.users ? authLinks : guestLinks}:{authredirect}
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
