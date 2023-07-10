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

function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  threadId,
  authUser,
  upVote,
  downVote,
  neutralVote,
}) {
  const isCommentUpvoted = upVotesBy.includes(authUser);
  const isCommentDownvoted = downVotesBy.includes(authUser);

  const onUpVoteClick = (event) => {
    event.stopPropagation();
    if (isCommentUpvoted) {
      neutralVote({ threadId, commentId: id });
      return;
    }
    upVote({ threadId, commentId: id });
  };

  const onDownVoteClick = (event) => {
    event.stopPropagation();
    if (isCommentDownvoted) {
      neutralVote({ threadId, commentId: id });
      return;
    }
    downVote({ threadId, commentId: id });
  };

  return (
    <div className="comment-item">
      <div className="comment-item__header">
        <div className="comment-item__profile">
          <img src={owner.avatar} alt={owner.name} />
          <span>{owner.name}</span>
        </div>
        <span>{postedAt(createdAt)}</span>
      </div>
      <div className="comment-item__body">
        <div className="comment-item__votes">
          <button type="button" onClick={onUpVoteClick} aria-label="up vote">
            {isCommentUpvoted ? <BsCaretUpFill /> : <BsCaretUp />}
          </button>
          <p>{upVotesBy.length - downVotesBy.length}</p>
          <button type="button" onClick={onDownVoteClick} aria-label="down vote">
            {isCommentDownvoted ? <BsCaretDownFill /> : <BsCaretDown />}
          </button>
        </div>
        <div>{parser(content)}</div>
      </div>
    </div>
  );
}

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.object.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  threadId: PropTypes.string.isRequired,
  authUser: PropTypes.string.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralVote: PropTypes.func.isRequired,
};

export default CommentItem;
