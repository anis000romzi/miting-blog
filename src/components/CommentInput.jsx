import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CommentInput({ addComment }) {
  const [body, setBody] = useState('');

  const onBodyChange = (event) => {
    setBody(event.target.innerHTML);
  };

  return (
    <form className="comment-input">
      <div
        className="comment-input__body"
        contentEditable
        onInput={onBodyChange}
      />
      <button type="button" onClick={() => addComment(body)}>
        Add Comment
      </button>
    </form>
  );
}

CommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentInput;
