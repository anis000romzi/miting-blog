import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import {
  BsCaretUp,
  BsCaretUpFill,
  BsCaretDown,
  BsCaretDownFill,
} from 'react-icons/bs';
import { postedAt } from '../utils';

function ThreadDetail({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  upVote,
  downVote,
  neutralVote,
}) {
  const isThreadUpvoted = upVotesBy.includes(authUser);
  const isThreadDownvoted = downVotesBy.includes(authUser);

  const onUpVoteClick = (event) => {
    event.stopPropagation();
    if (isThreadUpvoted) {
      neutralVote(id);
      return;
    }
    upVote(id);
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    if (isThreadDownvoted) {
      neutralVote(id);
      return;
    }
    downVote(id);
  };

  return (
    <div className="thread-detail">
      <div className="thread-detail__header">
        <span>
          #
          {' '}
          {category}
        </span>
        <h2>{title}</h2>
      </div>
      <div className="thread-detail__body">
        <div className="thread-detail__votes">
          <button type="button" onClick={onUpVoteClick}>
            {isThreadUpvoted ? <BsCaretUpFill /> : <BsCaretUp />}
          </button>
          <p>{upVotesBy.length - downVotesBy.length}</p>
          <button type="button" onClick={onDownVoteClick}>
            {isThreadDownvoted ? <BsCaretDownFill /> : <BsCaretDown />}
          </button>
        </div>
        <div>{parser(body)}</div>
      </div>
      <div className="thread-detail__footer">
        <div className="thread-detail__profile">
          <img src={owner.avatar} alt={owner.name} />
          <span>{owner.name}</span>
        </div>
        <span>{postedAt(createdAt)}</span>
      </div>
    </div>
  );
}

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.object.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.string.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralVote: PropTypes.func.isRequired,
};

export default ThreadDetail;
