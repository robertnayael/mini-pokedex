import React from 'react';
import { Provider } from 'react-redux';
import configureStore, { MockStore } from 'redux-mock-store';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import CardList from './CardList';
import { initialState, actions } from '../../store';
import LoadMoreCards from '../../components/LoadMoreCards/LoadMoreCards';

jest.mock('../../components/LoadMoreCards/LoadMoreCards');

describe('<CardList>', () => {

    let onVisibleCallback: () => void;
    let store: MockStore;

    beforeAll(() => {
        (LoadMoreCards as any).mockImplementation(({ onVisible }: any) => {
            onVisibleCallback = onVisible;
            return null;
        });
    });

    beforeEach(() => {
        onVisibleCallback = () => { };
        store = configureStore()(initialState);
    });

    afterAll(() => {
        jest.unmock('./LoadMoreCards');
    })

    it('renders without crashing', () => {
        render(
            <Provider store={store}>
                <CardList />
            </Provider>
        );
    });

    it('requests first card batch on mount', () => {
        render(
            <Provider store={store}>
                <CardList />
            </Provider>
        );

        const dispatchedActions = store.getActions();
        const expectedActions = [ actions.requestCardBatch() ];

        expect(dispatchedActions).toEqual(expectedActions);
    });

    it('requests next card batches whenever <LoadMoreCards> gets visible', () => {
        render(
            <Provider store={store}>
                <CardList />
            </Provider>
        );

        let dispatchedActions = store.getActions();
        const expectedActions = [
            actions.requestCardBatch(), // the first action is dispatched automatically on mount
            actions.requestCardBatch(),
        ];
        onVisibleCallback();
        expect(dispatchedActions).toEqual(expectedActions);

        dispatchedActions = store.getActions();
        expectedActions.push(actions.requestCardBatch());
        onVisibleCallback();
        expect(dispatchedActions).toEqual(expectedActions);
    });

});
