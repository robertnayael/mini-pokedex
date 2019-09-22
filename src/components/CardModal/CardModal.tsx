import React from 'react';

import { Portal, CardDetails } from '../';
import { Card } from '../../models';
import { Backdrop, CloseButton, Modal } from './CardModal.styles';

interface CardModalProps {
    card: Card | null;
    similarCards: Card[] | null;
    isOpen: boolean;
    wasOpenEver: boolean;
}

const CardModal: React.FC<CardModalProps> = ({ card, similarCards, isOpen, wasOpenEver }) => (
    <Portal>
        <Backdrop
            visible={isOpen}
            to="/"
        />
        <Modal
            isOpen={isOpen}
            wasOpenEver={wasOpenEver}
        >
            <CloseButton
                to="/"
            />
            <CardDetails similarCards={similarCards} card={card} />
        </Modal>
    </Portal>
);

export default CardModal;
