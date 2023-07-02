import { describe, it, expect } from 'vitest';
import threadDetailReducer from './reducer';

/**
 * test scenario for threadDetailReducer
 *
 * - threadDetailReducers function
 *   - should return the initial state when given by unknown action
 *   - should return thread detail when given by RECEIVE_THREAD_DETAIL action
 *   - should return null when given by CLEAR_THREAD_DETAIL action
 *   - should return upvoted thread when given by UP_VOTE_THREAD_DETAIL action
 *   - should return downvoted thread when given by DOWN_VOTE_THREAD_DETAIL action
 *   - should return thread with 'downVotesBy' or 'upVotesBy' value removed
 *     when given by NEUTRALIZE_THREAD_DETAIL_VOTE action
 *
 *   - should return thread with new comment when given by ADD_COMMENT action
 *   - should return thread's upvoted comments when given by UP_VOTE_COMMENT action
 *   - should return thread's downvoted comments when given by DOWN_VOTE_COMMENT action
 *   - should return thread's comments with 'downVotesBy' or 'upVotesBy' value removed
 *     when given by NEUTRALIZE_COMMENT_VOTE action
 *
 */

describe('threadsReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = {};
    const action = { type: 'UNKNOWN' };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return null when given by RECEIVE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {};
    const action = {
      type: 'RECEIVE_THREAD_DETAIL',
      payload: {
        threadDetail: {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: ['users-2'],
          comments: [
            {
              id: 'comment-1',
              content: 'Ini adalah komentar pertama',
              createdAt: '2021-06-21T07:00:00.000Z',
              owner: {
                id: 'users-1',
                name: 'John Doe',
                avatar: 'https://generated-image-url.jpg',
              },
              upVotesBy: [],
              downVotesBy: [],
            },
          ],
        },
      },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual(action.payload.threadDetail);
  });

  it('should return null when given by CLEAR_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {};
    const action = { type: 'CLEAR_THREAD_DETAIL' };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual(null);
  });

  it('should return upvoted thread when given by UP_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: ['users-2'],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: 'UP_VOTE_THREAD_DETAIL',
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [action.payload.userId],
      downVotesBy: [],
    });
  });

  it('should return downvoted thread when given by DOWN_VOTE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['users-2'],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: 'DOWN_VOTE_THREAD_DETAIL',
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: [action.payload.userId],
    });
  });

  it("should return threadDetail with 'downVotesBy' or 'upVotesBy' value removed when given by NEUTRALIZE_THREAD_DETAIL_VOTE action", () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['users-2'],
      downVotesBy: ['users-3'],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };

    const actionNeutralizeUpVote = {
      type: 'NEUTRALIZE_THREAD_DETAIL_VOTE',
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };

    const actionNeutralizeDownVote = {
      type: 'NEUTRALIZE_THREAD_DETAIL_VOTE',
      payload: {
        threadId: 'thread-1',
        userId: 'users-3',
      },
    };
    // action: neutralize upvote
    const nextState = threadDetailReducer(initialState, actionNeutralizeUpVote);
    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [],
    });

    // action: neutralize downvote
    const nextState2 = threadDetailReducer(
      initialState,
      actionNeutralizeDownVote,
    );
    // assert
    expect(nextState2).toEqual({
      ...initialState,
      downVotesBy: [],
    });
  });

  it('should return thread with new comment when given by ADD_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['users-2'],
      downVotesBy: ['users-3'],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: 'ADD_COMMENT',
      payload: {
        comment: {
          id: 'comment-2',
          content: 'Ini adalah komentar kedua',
          createdAt: '2021-07-21T07:00:00.000Z',
          owner: {
            id: 'users-2',
            name: 'Jane Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [action.payload.comment, ...initialState.comments],
    });
  });

  it("should return thread's upvoted comments when given by UP_VOTE_COMMENT action", () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: ['users-2'],
        },
      ],
    };
    const action = {
      type: 'UP_VOTE_COMMENT',
      payload: {
        threadId: 'thread-1',
        commentId: 'comment-1',
        userId: 'users-2',
      },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [action.payload.userId],
          downVotesBy: [],
        },
      ],
    });
  });

  it("should return thread's downvoted comments when given by DOWN_VOTE_COMMENT action", () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: ['users-2'],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: 'DOWN_VOTE_COMMENT',
      payload: {
        threadId: 'thread-1',
        commentId: 'comment-1',
        userId: 'users-2',
      },
    };
    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [],
          downVotesBy: [action.payload.userId],
        },
      ],
    });
  });

  it("should return thread's comments with 'downVotesBy' or 'upVotesBy' value removed when given by NEUTRALIZE_COMMENT_VOTE action", () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2021-06-21T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: ['users-2'],
          downVotesBy: ['users-3'],
        },
      ],
    };

    const actionNeutralizeUpVote = {
      type: 'NEUTRALIZE_COMMENT_VOTE',
      payload: {
        threadId: 'thread-1',
        commentId: 'comment-1',
        userId: 'users-2',
      },
    };

    const actionNeutralizeDownVote = {
      type: 'NEUTRALIZE_COMMENT_VOTE',
      payload: {
        threadId: 'thread-1',
        commentId: 'comment-1',
        userId: 'users-3',
      },
    };
    // action: neutralize upvote
    const nextState = threadDetailReducer(initialState, actionNeutralizeUpVote);
    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [],
        },
      ],
    });

    // action: neutralize downvote
    const nextState2 = threadDetailReducer(
      initialState,
      actionNeutralizeDownVote,
    );
    // assert
    expect(nextState2).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          downVotesBy: [],
        },
      ],
    });
  });
});
