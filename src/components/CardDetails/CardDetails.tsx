import React from 'react';

import { Card } from '../../models';
import { Details } from './CardDetails.styles';

interface CardDetailsProps extends Card {}

const CardDetails: React.FC<CardDetailsProps> = ({ name }) => (
    <Details>
        {name}
    </Details>
);

export default CardDetails;
