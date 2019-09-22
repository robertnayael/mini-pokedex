import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { CardList, SelectedCard } from '../';
import store from '../../store';
import { appTitle } from '../../config';
import { DocumentTitle } from '../../components';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <DocumentTitle>{appTitle}</DocumentTitle>
      <Provider store={store}>
        <Router>
          <Route path="/:id">
            {({ match }) => <SelectedCard id={match ? match.params.id : match}/>}
          </Route>
          <CardList />
        </Router>
      </Provider>
    </React.Fragment>
  )
}

export default App;
