import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import HeaderBar from '../components/HeaderBar';

import '../styles/style.css';

const stories = {
  title: 'HeaderBar',
  component: HeaderBar,
};

export default stories;

function TemplateStory(args) {
  return (
    <BrowserRouter>
      <HeaderBar {...args} />
    </BrowserRouter>
  );
}

const LoggedIn = TemplateStory.bind({});
LoggedIn.args = {
  authUser: {
    id: 'user-gIbIFEGj6OHbpJY4',
    name: 'anis',
    avatar: 'https://ui-avatars.com/api/?name=anis&background=random',
  },
  logOut: () => window.alert('logged out!'),
};

const LoggedOut = TemplateStory.bind({});
LoggedOut.args = {
  authUser: null,
  logOut: () => {},
};

export { LoggedIn, LoggedOut };
