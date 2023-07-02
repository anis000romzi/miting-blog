import React from 'react';
import {
  describe, it, expect, afterEach, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import ThreadInput from './ThreadInput';

/**
 * test scenario for ThreadInput Component
 *
 * - ThreadInput component
 *   - should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle body typing correctly
 *   - should call Add Thread function when addThread button is clicked
 */

expect.extend(matchers);

describe('ThreadInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    // Arrange
    render(<ThreadInput addThread={() => {}} />);
    const titleInput = await screen.getByPlaceholderText('Title');
    // Action
    await userEvent.type(titleInput, 'App Testing');
    // Assert
    expect(titleInput).toHaveValue('App Testing');
  });

  it('should handle category typing correctly', async () => {
    // Arrange
    render(<ThreadInput addThread={() => {}} />);
    const categoryInput = await screen.getByPlaceholderText('Category');
    // Action
    await userEvent.type(categoryInput, 'testing');
    // Assert
    expect(categoryInput).toHaveValue('testing');
  });

  it('should handle body typing correctly', async () => {
    // Arrange
    const { container } = render(<ThreadInput addThread={() => {}} />);
    const bodyInput = container.querySelector('#body');
    // Action
    await userEvent.click(bodyInput);
    await userEvent.keyboard('testing testing testing');
    // Assert
    expect(bodyInput.textContent).toBe('testing testing testing');
  });

  it('should call Add Thread function when addThread button is clicked', async () => {
    // Arrange
    const mockThread = vi.fn();
    const { container } = render(<ThreadInput addThread={mockThread} />);

    const titleInput = await screen.getByPlaceholderText('Title');
    await userEvent.type(titleInput, 'App Testing');
    const categoryInput = await screen.getByPlaceholderText('Category');
    await userEvent.type(categoryInput, 'testing');
    const bodyInput = container.querySelector('#body');
    await userEvent.click(bodyInput);
    await userEvent.keyboard('testing testing testing');
    const addThreadButton = await screen.getByRole('button', { name: 'Add Thread' });
    // Action
    await userEvent.click(addThreadButton);
    // Assert
    expect(mockThread).toBeCalledWith({
      title: 'App Testing',
      category: 'testing',
      body: 'testing testing testing',
    });
  });
});
