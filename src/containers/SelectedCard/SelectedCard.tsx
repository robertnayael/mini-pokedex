import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../../store';
import { getSelectedCard, getSimilarCards } from '../../store/selectors';
import { CardModal, DocumentTitle } from '../../components';

interface SelectedCardProps {
    id: string | null;
}

const SelectedCard: React.FC<SelectedCardProps> = ({ id }) => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(id
        ? actions.openCardDetails(id)
        : actions.closeCardDetails()
      )
    }, [ dispatch, id]);

    const isOpen = id !== null;
    const [ wasOpenEver, setWasOpenEver ] = useState(false);
    isOpen && !wasOpenEver && setWasOpenEver(true);

    const card = useSelector(getSelectedCard);
    const similarCards = useSelector(getSimilarCards);

    return (
      <React.Fragment>
        {card && isOpen && <DocumentTitle>{card.name}</DocumentTitle>}
        <CardModal
          card={card}
          similarCards={similarCards}
          isOpen={isOpen}
          wasOpenEver={wasOpenEver}
        />
      </React.Fragment>
    );
};

export default SelectedCard;
