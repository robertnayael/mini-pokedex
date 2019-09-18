import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions } from '../../store';
import { getSelectedCard, getSimilarCards } from '../../store/selectors';
import { CardModal } from '../../components';

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

    return <CardModal
      card={useSelector(getSelectedCard)}
      similarCards={useSelector(getSimilarCards)}
      isOpen={isOpen}
      wasOpenEver={wasOpenEver}
    />;
};

export default SelectedCard;
