import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ThreadItem from '../components/ThreadItem';

import '../styles/style.css';

const stories = {
  title: 'ThreadItem',
  component: ThreadItem,
};

export default stories;

const TemplateStory = (args) => (
  <BrowserRouter>
    <ThreadItem {...args} />
  </BrowserRouter>
);

const NeutralVote = TemplateStory.bind({});
NeutralVote.args = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  user: {
    id: 'user-1',
    name: 'User 1',
    email: 'userone@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: ['users-2', 'users-3'],
  downVotesBy: [],
  totalComments: 5,
  authUser: '',
  upVote: () => window.alert('Please login to upvote threads!'),
  downVote: () => window.alert('Please login to downvote threads!'),
  neutralVote: () => {},
};

const UpVoted = TemplateStory.bind({});
UpVoted.args = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  user: {
    id: 'user-1',
    name: 'User 1',
    email: 'userone@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: ['users-2', 'users-3', 'users-4'],
  downVotesBy: [],
  totalComments: 5,
  authUser: 'users-4',
  upVote: () => {},
  downVote: () => window.alert('Thread downvoted!'),
  neutralVote: () => window.alert('Vote removed!'),
};

const DownVoted = TemplateStory.bind({});
DownVoted.args = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  user: {
    id: 'user-1',
    name: 'User 1',
    email: 'userone@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: ['users-2', 'users-3'],
  downVotesBy: ['users-4'],
  totalComments: 5,
  authUser: 'users-4',
  upVote: () => window.alert('Thread upvoted!'),
  downVote: () => {},
  neutralVote: () => window.alert('Vote removed!'),
};

export { NeutralVote, UpVoted, DownVoted };
