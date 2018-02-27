import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import css from './style.scss';

@inject('auth')
@observer
class Header extends Component {
  get auth() {
    return this.props.auth;
  }

  render() {
    const { isLoggedIn } = this.auth;

    return (
      <header className={css.header}>
        <nav>
          <ul>
            <li>
              <NavLink exact activeClassName={css.activeLink} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={css.activeLink} to="/instructors">
                Instructors
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName={css.activeLink} to="/profile">
                Profile
              </NavLink>
            </li>

            {isLoggedIn && (
              <li>
                <NavLink activeClassName={css.activeLink} to="/logout">
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
