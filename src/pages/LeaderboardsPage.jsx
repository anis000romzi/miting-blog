import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import LeaderboardsList from '../components/LeaderboardsList';

function LeaderboardsPage() {
  const leaderboards = useSelector((states) => states.leaderboards);
  const authUser = useSelector((states) => states.authUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <main className="leaderboards-page">
      <LeaderboardsList leaderboards={leaderboards} authUser={authUser ? authUser.id : ''} />
    </main>
  );
}

export default LeaderboardsPage;
