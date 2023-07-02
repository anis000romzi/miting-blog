import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncReceiveThreadDetail,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncNeutralizeThreadDetailVote,
  asyncAddComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeCommentVote,
} from '../states/threadDetail/action';
import ThreadDetail from '../components/ThreadDetail';
import CommentInput from '../components/CommentInput';
import CommentsList from '../components/CommentsList';

function DetailPage() {
  const { id } = useParams();
  const threadDetail = useSelector((states) => states.threadDetail);
  const authUser = useSelector((states) => states.authUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onUpVote = (id) => {
    if (authUser === null) {
      alert('Please login to upvote a thread!');
      return;
    }
    dispatch(asyncUpVoteThreadDetail(id));
  };

  const onDownVote = (id) => {
    if (authUser === null) {
      alert('Please login to downvote a thread!');
      return;
    }
    dispatch(asyncDownVoteThreadDetail(id));
  };

  const onNeutralVote = (id) => {
    dispatch(asyncNeutralizeThreadDetailVote(id));
  };

  const onAddComment = (content) => {
    dispatch(asyncAddComment({ id, content }));
  };

  const onUpVoteComment = ({ threadId, commentId }) => {
    if (authUser === null) {
      alert('Please login to upvote comments!');
      return;
    }
    dispatch(asyncUpVoteComment({ threadId, commentId }));
  };

  const onDownVoteComment = ({ threadId, commentId }) => {
    if (authUser === null) {
      alert('Please login to downvote comments!');
      return;
    }
    dispatch(asyncDownVoteComment({ threadId, commentId }));
  };

  const onNeutralCommentVote = ({ threadId, commentId }) => {
    dispatch(asyncNeutralizeCommentVote({ threadId, commentId }));
  };

  return (
    <main className="detail-page">
      {threadDetail && (
        <>
          <ThreadDetail
            {...threadDetail}
            authUser={authUser ? authUser.id : ''}
            upVote={onUpVote}
            downVote={onDownVote}
            neutralVote={onNeutralVote}
          />
          {authUser === null ? (
            <p>
              Please
              {' '}
              <Link to="/login">login</Link>
              {' '}
              to comment on a thread!
            </p>
          ) : (
            <CommentInput addComment={onAddComment} />
          )}
          <CommentsList
            threadId={threadDetail.id}
            comments={threadDetail.comments}
            authUser={authUser ? authUser.id : ''}
            upVote={onUpVoteComment}
            downVote={onDownVoteComment}
            neutralVote={onNeutralCommentVote}
          />
        </>
      )}
    </main>
  );
}

export default DetailPage;
