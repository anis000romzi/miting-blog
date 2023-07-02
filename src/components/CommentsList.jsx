import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';

function CommentsList({
  comments, threadId, authUser, upVote, downVote, neutralVote,
}) {
  return (
    <div className="comments-list">
      <p>
        Comments:
        {' '}
        {comments.length}
      </p>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          {...comment}
          threadId={threadId}
          authUser={authUser}
          upVote={upVote}
          downVote={downVote}
          neutralVote={neutralVote}
        />
      ))}
    </div>
  );
}

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  threadId: PropTypes.string.isRequired,
  authUser: PropTypes.string.isRequired,
  upVote: PropTypes.func.isRequired,
  downVote: PropTypes.func.isRequired,
  neutralVote: PropTypes.func.isRequired,
};

export default CommentsList;
