import {
  describe, it, vi, beforeEach, expect, afterEach,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncSetAuthUser, asyncUnsetAuthUser, setAuthUserActionCreator, unsetAuthUserActionCreator,
} from './action';

/**
 * test scenario for asyncSetAuthUser and asyncUnsetAuthUser
 *
 * - asyncSetAuthUser thunk
 *   - should dispatch action correctly when login success
 *   - should dispatch action and call alert correctly when login failed
 *
 * - asyncUnsetAuthUser thunk
 *   - should dispatch action correctly when logout
 */

const fakeUserResponse = {
  email: 'test@gmail.com',
  password: '123456',
};
const fakeToken = 'abcdefgh';
const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    api._login = api.login;
    api._getOwnProfile = api.getOwnProfile;
  });

  afterEach(() => {
    api.login = api._login;
    api.getOwnProfile = api._getOwnProfile;

    // delete backup data
    delete api._login;
    delete api._getOwnProfile;
  });

  it('should dispatch action correctly when login success', async () => {
    // arrange
    api.login = () => Promise.resolve(fakeToken);
    api.getOwnProfile = () => Promise.resolve(fakeUserResponse);

    const spy = vi.spyOn(api, 'putAccessToken');
    const dispatch = vi.fn();
    // action
    await asyncSetAuthUser(fakeUserResponse)(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(spy).toHaveBeenCalledWith(fakeToken);
    expect(dispatch).toHaveBeenCalledWith(setAuthUserActionCreator(fakeUserResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when login failed', async () => {
    // arrange
    api.login = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();
    // action
    await asyncSetAuthUser(fakeUserResponse)(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncUnsetAuthUser thunk', () => {
  it('should dispatch action correctly when logout', async () => {
    // arrange
    const dispatch = vi.fn();
    const spy = vi.spyOn(api, 'putAccessToken');
    // action
    await asyncUnsetAuthUser(fakeUserResponse)(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(spy).toHaveBeenCalledWith('');
  });
});
