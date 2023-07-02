import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function ThreadInput({ addThread }) {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, setBody] = useState('');

  const onBodyChange = (event) => {
    setBody(event.target.innerHTML);
  };

  return (
    <form className="thread-input">
      <input
        type="text"
        id="title"
        className="thread-input__title"
        placeholder="Title"
        value={title}
        onChange={onTitleChange}
      />
      <input
        type="text"
        id="category"
        className="thread-input__category"
        placeholder="Category"
        value={category}
        onChange={onCategoryChange}
      />
      <div
        id="body"
        className="thread-input__body"
        contentEditable
        onInput={onBodyChange}
      />
      <button
        type="button"
        onClick={() => addThread({ title, category, body })}
      >
        Add Thread
      </button>
    </form>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;
