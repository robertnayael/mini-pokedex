import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';

import rootEpic from './epics';
import reducer from './reducer';
import apiService, { ApiService } from '../apiService';
import { Action } from './actions';
import { State } from './state';

function configureStore() {
    const epicMiddleware = createEpicMiddleware<Action, Action, State, ApiService>({
        dependencies: apiService
    });

    const store = createStore(
        reducer,
        composeWithDevTools(
            applyMiddleware(epicMiddleware)
        )
    );

    epicMiddleware.run(rootEpic);

    return store;
}

export default configureStore();
