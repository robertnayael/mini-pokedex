import { combineEpics } from 'redux-observable';

import { cardDetailsEpic } from './cardDetailsEpic';
import { nextCardBatchEpic } from './nextCardBatchEpic';
import { lastCardBatchEpic } from './lastCardBatchEpic';
import { similarCardsEpic } from './similarCardsEpic';

export default combineEpics(
    cardDetailsEpic,
    nextCardBatchEpic,
    lastCardBatchEpic,
    similarCardsEpic
);
