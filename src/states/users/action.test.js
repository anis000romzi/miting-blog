import {
  describe, it, vi, beforeEach, expect, afterEach,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { asyncRegisterUser } from './action';
import api from '../../utils/api';

/**
 * test scenario for asyncRegisterUser
 *
 * - asyncRegisterUser thunk
 *   - should call register function when post request success
 *   - should dispatch action and call alert correctly when register failed
 */

const fakeBodyRequest = {
  name: 'test',
  email: 'test@gmail.com',
  password: '123456',
};
const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    api._register = api.register;
  });

  afterEach(() => {
    api.register = api._register;

    // delete backup data
    delete api._register;
  });

  it('should call register function when post request success', async () => {
    // arrange
    api.register = ({ name, email, password }) => Promise.resolve({ name, email, password });

    const spy = vi.spyOn(api, 'register');
    const dispatch = vi.fn();
    // action
    await asyncRegisterUser(fakeBodyRequest)(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(spy).toHaveBeenCalledWith(fakeBodyRequest);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when register failed', async () => {
    // arrange
    api.register = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();
    // action
    await asyncRegisterUser(fakeBodyRequest)(dispatch);
    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
