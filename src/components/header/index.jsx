import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import css from './style.scss';

class Header extends Component {
  render() {
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
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
