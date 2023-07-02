import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useOpenNav from '../hooks/useOpenNav';

function HeaderBar({ authUser, logOut }) {
  const { ref, navOpen, setNavOpen } = useOpenNav();
  const { id, name, avatar } = authUser || {};

  return (
    <header ref={ref} className="header-bar">
      <div className="header-bar__menu">
        <button
          aria-label="Navigation button"
          id="hamburgerButton"
          type="button"
          onClick={() => setNavOpen((current) => !current)}
        >
          ☰
        </button>
      </div>
      <div className="header-bar__title">
        <h1>
          miting~
          <span>blog</span>
        </h1>
      </div>
      <nav
        id="navigationDrawer"
        className={`header-bar__nav ${navOpen ? 'open' : ''}`}
      >
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/leaderboards">Leaderboards</Link>
          </li>
          <li>
            {authUser === null ? (
              <Link to="/login">Login</Link>
            ) : (
              <button type="button" onClick={logOut}>
                <img src={avatar} alt={id} />
                <p>{name}</p>
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

HeaderBar.defaultProps = {
  authUser: null,
};

HeaderBar.propTypes = {
  /** User data object to be displayed when logged in */
  authUser: PropTypes.object,
  /** Log-out function */
  logOut: PropTypes.func.isRequired,
};

export default HeaderBar;
