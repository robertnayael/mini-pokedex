import React from 'react';

import { Card } from '../../models';
import {
    Details,
    Image,
    ImagePlaceholder,
    TopWrapper
} from './CardDetails.styles';
import CardProperties from './CardProperties'
import SimilarCards from './SimilarCards'
import CardPropertiesPlaceholder from './CardPropertiesPlaceholder';

interface CardDetailsProps {
    card: Card | null;
    similarCards: Card[] | null;
}

const CardDetails: React.FC<CardDetailsProps> = ({ card, similarCards }) => {
    return (
    <Details>
        <TopWrapper>
            <ImagePlaceholder>
                {card && <Image src={card.imageUrlHiRes}/>}
            </ImagePlaceholder>
            {card
                ? <CardProperties {...card}/>
                : <CardPropertiesPlaceholder/>
            }
        </TopWrapper>
        <SimilarCards cards={similarCards}/>
    </Details>
)
};

export default CardDetails;
