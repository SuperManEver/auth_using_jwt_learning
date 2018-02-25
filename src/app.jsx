import React, { Component } from 'react';
import { render } from 'react-dom';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import css from './global.scss';

import Header from './components/header';
import InstructionsPage from './pages/instructions';
import ProfilePage from './pages/profile';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';

class App extends Component {
  render() {
    return (
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
            <Route path="/instructors" component={InstructionsPage} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
          </Switch>
        </div>
      </section>
    );
  }
}

const mountingElement = document.getElementById('main');

render(
  <Router>
    <App />
  </Router>,
  mountingElement,
);

if (module.hot) {
  module.hot.accept();
}
