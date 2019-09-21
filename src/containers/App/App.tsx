import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { CardList, SelectedCard } from '../';
import store from '../../store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/:id">
          {({ match }) => <SelectedCard id={match ? match.params.id : match}/>}
        </Route>
        <CardList />
      </Router>
    </Provider>
  )
}

export default App;
