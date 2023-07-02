import React from 'react';
import PropTypes from 'prop-types';

function LeaderboardsItem({ user, score, authUser }) {
  return (
    <div className="leaderboard-item">
      <div className="leaderboard-item__profile">
        <img src={user.avatar} alt={user.name} />
        <span>
          {user.name}
          {' '}
          {user.id === authUser && '(You)'}
        </span>
      </div>
      <p>
        <em>{score}</em>
      </p>
    </div>
  );
}

LeaderboardsItem.propTypes = {
  user: PropTypes.object.isRequired,
  score: PropTypes.number.isRequired,
  authUser: PropTypes.string.isRequired,
};

export default LeaderboardsItem;
