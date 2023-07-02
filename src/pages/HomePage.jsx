import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaFeatherAlt } from 'react-icons/fa';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeThreadVote,
} from '../states/threads/action';
import ThreadsList from '../components/ThreadsList';

function HomePage() {
  const threads = useSelector((states) => states.threads);
  const users = useSelector((states) => states.users);
  const authUser = useSelector((states) => states.authUser);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onUpVote = (id) => {
    if (authUser === null) {
      alert('Please login to upvote threads!');
      return;
    }
    dispatch(asyncUpVoteThread(id));
  };

  const onDownVote = (id) => {
    if (authUser === null) {
      alert('Please login to downvote threads!');
      return;
    }
    dispatch(asyncDownVoteThread(id));
  };

  const onNeutralVote = (id) => {
    dispatch(asyncNeutralizeThreadVote(id));
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser ? authUser.id : '',
  }));

  return (
    <main className="home-page">
      {authUser && (
        <button
          className="new-thread-button"
          type="button"
          onClick={() => navigate('/new')}
        >
          <FaFeatherAlt />
        </button>
      )}
      <ThreadsList
        threads={threadList}
        upVote={onUpVote}
        downVote={onDownVote}
        neutralVote={onNeutralVote}
      />
    </main>
  );
}

export default HomePage;
