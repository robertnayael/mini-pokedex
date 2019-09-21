import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { LoadMoreCards, MainList } from '../../components';
import { actions } from '../../store';
import { getCardList } from '../../store/selectors';
import { Link } from 'react-router-dom';

const CardList: React.FC = () => {

    const dispatch = useDispatch();
    const cards = useSelector(getCardList);

    const requestNextBatch = useCallback(
        () => { dispatch(actions.requestCardBatch()) },
        [ dispatch ]
    );

    useEffect(
        requestNextBatch,
        [ requestNextBatch ]
    );

    return (
        <div>
            <MainList cards={cards}/>
            <LoadMoreCards
                phantomItems={20}
                onVisible={requestNextBatch}
            />
        </div>
    );
}

export default CardList;
