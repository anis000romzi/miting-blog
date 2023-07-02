import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/users/action';
import RegisterInput from '../components/RegisterInput';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));

    navigate('/login');
  };

  return (
    <main className="register-page">
      <h2>Create Your Account!</h2>
      <RegisterInput register={onRegister} />
      <p>
        Already have an account?
        {' '}
        <Link to="/login">Login!</Link>
      </p>
    </main>
  );
}

export default RegisterPage;
