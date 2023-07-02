import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/action';
import LoginInput from '../components/LoginInput';

function LoginPage({ authUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  if (authUser) {
    return null;
  }

  return (
    <main className="login-page">
      <h2>Login</h2>
      <LoginInput login={onLogin} />
      <p>
        Don&apos;t have an account?
        {' '}
        <Link to="/register">Register!</Link>
      </p>
    </main>
  );
}

LoginPage.defaultProps = {
  authUser: null,
};

LoginPage.propTypes = {
  authUser: PropTypes.object,
};

export default LoginPage;
