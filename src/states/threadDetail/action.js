import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  UP_VOTE_THREAD_DETAIL: 'UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE_THREAD_DETAIL: 'DOWN_VOTE_THREAD_DETAIL',
  NEUTRALIZE_THREAD_DETAIL_VOTE: 'NEUTRALIZE_THREAD_DETAIL_VOTE',
  ADD_COMMENT: 'ADD_COMMENT',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  NEUTRALIZE_COMMENT_VOTE: 'NEUTRALIZE_COMMENT_VOTE',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function upVoteThreadDetailActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UP_VOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteThreadDetailActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralizeThreadDetailVoteActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_THREAD_DETAIL_VOTE,
    payload: {
      threadId,
      userId,
    },
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function upVoteCommentActionCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function downVoteCommentActionCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function neutralizeCommentVoteActionCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_COMMENT_VOTE,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());

    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(
      upVoteThreadDetailActionCreator({ threadId, userId: authUser.id }),
    );

    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(
        neutralizeThreadDetailVoteActionCreator({
          threadId,
          userId: authUser.id,
        }),
      );
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(
      downVoteThreadDetailActionCreator({ threadId, userId: authUser.id }),
    );

    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(
        neutralizeThreadDetailVoteActionCreator({
          threadId,
          userId: authUser.id,
        }),
      );
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralizeThreadDetailVote(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(
      neutralizeThreadDetailVoteActionCreator({ threadId, userId: authUser.id }),
    );

    try {
      await api.neutralizeThreadVote(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(
        neutralizeThreadDetailVoteActionCreator({
          threadId,
          userId: authUser.id,
        }),
      );
    }

    dispatch(hideLoading());
  };
}

function asyncAddComment({ id, content }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const comment = await api.createComment({ id, content });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncUpVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(
      upVoteCommentActionCreator({ threadId, commentId, userId: authUser.id }),
    );

    try {
      await api.upVoteComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(
        neutralizeCommentVoteActionCreator({
          threadId,
          commentId,
          userId: authUser.id,
        }),
      );
    }

    dispatch(hideLoading());
  };
}

function asyncDownVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(
      downVoteCommentActionCreator({ threadId, commentId, userId: authUser.id }),
    );

    try {
      await api.downVoteComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(
        neutralizeCommentVoteActionCreator({
          threadId,
          commentId,
          userId: authUser.id,
        }),
      );
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralizeCommentVote({ threadId, commentId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(
      neutralizeCommentVoteActionCreator({
        threadId,
        commentId,
        userId: authUser.id,
      }),
    );

    try {
      await api.neutralizeCommentVote({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(
        neutralizeCommentVoteActionCreator({
          threadId,
          commentId,
          userId: authUser.id,
        }),
      );
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  upVoteThreadDetailActionCreator,
  downVoteThreadDetailActionCreator,
  neutralizeThreadDetailVoteActionCreator,
  addCommentActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralizeCommentVoteActionCreator,
  asyncReceiveThreadDetail,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncNeutralizeThreadDetailVote,
  asyncAddComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeCommentVote,
};
