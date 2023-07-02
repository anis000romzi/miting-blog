import { describe, it, expect } from 'vitest';
import threadsReducer from './reducer';

/**
 * test scenario for threadsReducer
 *
 * - threadsReducers function
 *   - should return the initial state when given by unknown action
 *   - should return threads when given by RECEIVE_THREADS action
 *   - should return threads with the new thread when given by ADD_THREAD action
 *   - should return threads with 'upVotesBy' value added when given by UP_VOTE_THREAD action
 *   - should return threads with 'downVotesBy' value added when given by DOWN_VOTE_THREAD action
 *   - should return threads with 'downVotesBy' or 'upVotesBy' value removed
 *     when given by NEUTRALIZE_THREAD_VOTE action
 *
 */

describe('threadsReducers function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return threads when given by RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
          {
            id: 'thread-2',
            title: 'Thread Kedua',
            body: 'Ini adalah thread kedua',
            category: 'General',
            createdAt: '2021-06-21T07:00:00.000Z',
            ownerId: 'users-2',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return threads with the new thread when given by ADD_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: 'ADD_THREAD',
      payload: {
        thread: {
          id: 'thread-2',
          title: 'Thread Kedua',
          body: 'Ini adalah thread kedua',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          ownerId: 'users-2',
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it("should return threads with 'upVotesBy' value added when given by UP_VOTE_THREAD action", () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: ['users-2'],
        totalComments: 0,
      },
    ];

    const action = {
      type: 'UP_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId],
        downVotesBy: [],
      },
    ]);
  });

  it("should return threads with 'downVotesBy' value added when given by DOWN_VOTE_THREAD action", () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['users-2'],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: 'DOWN_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };
    // action
    const nextState = threadsReducer(initialState, action);
    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
        downVotesBy: [action.payload.userId],
      },
    ]);
  });

  it("should return threads with 'downVotesBy' or 'upVotesBy' value removed when given by NEUTRALIZE_THREAD_VOTE action", () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2021-06-21T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['users-2'],
        downVotesBy: ['users-3'],
        totalComments: 0,
      },
    ];

    const actionNeutralizeUpVote = {
      type: 'NEUTRALIZE_THREAD_VOTE',
      payload: {
        threadId: 'thread-1',
        userId: 'users-2',
      },
    };

    const actionNeutralizeDownVote = {
      type: 'NEUTRALIZE_THREAD_VOTE',
      payload: {
        threadId: 'thread-1',
        userId: 'users-3',
      },
    };
    // action: neutralize upvote
    const nextState = threadsReducer(initialState, actionNeutralizeUpVote);
    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [],
      },
    ]);

    // action: neutralize downvote
    const nextState2 = threadsReducer(initialState, actionNeutralizeDownVote);
    // assert
    expect(nextState2).toEqual([
      {
        ...initialState[0],
        downVotesBy: [],
      },
    ]);
  });
});
