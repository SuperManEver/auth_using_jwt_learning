import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Provider, inject, observer } from 'mobx-react';

import css from './global.scss';

import AuthStore from './stores/auth';

import Header from './components/header';
import InstructionsPage from './pages/instructions';
import ProfilePage from './pages/profile';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';

@inject('auth')
@observer
class App extends Component {
  get auth() {
    return this.props.auth;
  }

  render() {
    const { isLoggedIn } = this.auth;

    return (
      <Router>
        <section>
          <Header />

          <div className={css.contentContainer}>
            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <div>
                    <h2>Root Page!</h2>
                  </div>
                )}
              />
              <Route
                path="/instructors"
                render={props =>
                  isLoggedIn ? (
                    <InstructionsPage {...props} />
                  ) : (
                    <Redirect to="/login" />
                  )
                }
              />
              <Route path="/profile" component={ProfilePage} />
              <Route
                path="/login"
                render={props =>
                  isLoggedIn ? (
                    <Redirect to="/instructors" />
                  ) : (
                    <LoginPage {...props} />
                  )
                }
              />
              <Route path="/signup" component={SignupPage} />
            </Switch>
          </div>
        </section>
      </Router>
    );
  }
}

const mountingElement = document.getElementById('main');

render(
  <Provider auth={AuthStore}>
    <App />
  </Provider>,
  mountingElement,
);

if (module.hot) {
  module.hot.accept();
}
