import React from 'react';
import PropTypes from 'prop-types';
import LeaderboardsItem from './LeaderboardsItem';

function LeaderboardsList({ leaderboards, authUser }) {
  return (
    <div className="leaderboards-list">
      {leaderboards.map((leaderboard) => (
        <LeaderboardsItem key={leaderboard.user.id} {...leaderboard} authUser={authUser} />
      ))}
    </div>
  );
}

LeaderboardsList.propTypes = {
  leaderboards: PropTypes.arrayOf(PropTypes.object).isRequired,
  authUser: PropTypes.string.isRequired,
};

export default LeaderboardsList;
