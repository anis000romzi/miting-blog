import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import parser from 'html-react-parser';
import {
  BsCaretUp,
  BsCaretUpFill,
  BsCaretDown,
  BsCaretDownFill,
} from 'react-icons/bs';
import { AiOutlineComment } from 'react-icons/ai';
import { postedAt } from '../utils';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  user,
  upVotesBy,
  downVotesBy,
  totalComments,
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
    <div className="thread-item">
      <div className="thread-item__header">
        <span>
          #
          {' '}
          {category}
        </span>
        <p>
          <Link to={`/threads/${id}`}>
            <strong>{title}</strong>
          </Link>
        </p>
      </div>
      <div className="thread-item__body">
        <div>{parser(body)}</div>
      </div>
      <div className="thread-item__footer">
        <div className="thread-item__votes">
          <button type="button" onClick={onUpVoteClick}>
            {isThreadUpvoted ? <BsCaretUpFill /> : <BsCaretUp />}
          </button>
          <span>{upVotesBy.length - downVotesBy.length}</span>
          <button type="button" onClick={onDownVoteClick}>
            {isThreadDownvoted ? <BsCaretDownFill /> : <BsCaretDown />}
          </button>
        </div>
        <div className="thread-item__comment">
          <span>
            {totalComments}
            &nbsp;
            &nbsp;
            <AiOutlineComment />
          </span>
        </div>
        <div className="thread-item__info">
          <span>
            {postedAt(createdAt)}
            {' '}
            •
            {' '}
            {user.name}
          </span>
        </div>
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  /** Id used for upvote, downvote, and linking to a thread detail */
  id: PropTypes.string.isRequired,
  /** The title for a thread */
  title: PropTypes.string.isRequired,
  /** The content of a thread */
  body: PropTypes.string.isRequired,
  /** The category of a thread */
  category: PropTypes.string.isRequired,
  /** The date a thread was created */
  createdAt: PropTypes.string.isRequired,
  /** Owner of a thread */
  user: PropTypes.object.isRequired,
  /** List of users who upvoted a thread */
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** List of users who downvoted a thread */
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** Total comments in a thread */
  totalComments: PropTypes.number.isRequired,
  /** The id of the current logged in user */
  authUser: PropTypes.string.isRequired,
  /** Up-vote function */
  upVote: PropTypes.func.isRequired,
  /** Down-vote function */
  downVote: PropTypes.func.isRequired,
  /** Remove Up-vote/Down-vote function */
  neutralVote: PropTypes.func.isRequired,
};

export default ThreadItem;
