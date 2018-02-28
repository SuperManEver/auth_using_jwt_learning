import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom';
import { Provider, inject, observer } from 'mobx-react';
import NotificationSystem from 'react-notification-system';

import css from './global.scss';

import AuthStore from './stores/auth';
import Notifications from './stores/notification';

import Header from './components/header';
import InstructionsPage from './pages/instructions';
import ProfilePage from './pages/profile';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';

@inject('auth')
@observer
class App extends Component {
  componentDidMount() {
    Notifications.init(this.refs.notificationSystem);
  }

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
              <Route
                path="/logout"
                render={() => {
                  this.auth.logout();

                  return <Redirect to="/" />;
                }}
              />
            </Switch>
          </div>
          <NotificationSystem
            className="notification"
            ref="notificationSystem"
            allowHTML
          />
        </section>
      </Router>
    );
  }
}

const mountingElement = document.getElementById('main');

render(
  <Provider auth={AuthStore} Notify={Notifications}>
    <App />
  </Provider>,
  mountingElement,
);

if (module.hot) {
  module.hot.accept();
}
