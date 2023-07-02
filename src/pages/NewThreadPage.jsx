import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncAddThread } from '../states/threads/action';
import ThreadInput from '../components/ThreadInput';

function NewThreadPage({ authUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser === null) {
      navigate('/');
    }
  }, [authUser, navigate]);

  const onAddThread = ({ title, category, body }) => {
    dispatch(asyncAddThread({ title, category, body }));
    navigate('/');
  };

  if (authUser === null) {
    return null;
  }

  return (
    <main className="new-thread-page">
      <h2>Create New Thread!</h2>
      <ThreadInput addThread={onAddThread} />
    </main>
  );
}

NewThreadPage.defaultProps = {
  authUser: null,
};

NewThreadPage.propTypes = {
  authUser: PropTypes.object,
};

export default NewThreadPage;
