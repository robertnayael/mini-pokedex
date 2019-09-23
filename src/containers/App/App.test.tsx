import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const root = document.createElement('div');
  const portal = document.createElement('portal');
  portal.id = 'portal';
  document.body.appendChild(portal);
  ReactDOM.render(<App />, root);
  ReactDOM.unmountComponentAtNode(root);
});
