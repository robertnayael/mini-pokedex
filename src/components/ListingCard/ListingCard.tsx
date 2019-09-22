import React from 'react';

import { Card } from '../../models';
import { Container, ImageLowRes, ImageHiRes, Name, StyledLink, Type } from './ListingCard.styles';

interface ListingCardProps extends Card {
    container: React.ComponentType;
};

const ListingCard: React.FC<ListingCardProps> = ({
    container: OuterContainer,
    id,
    name,
    types,
    imageUrl,
    imageUrlHiRes
}) => (
    <OuterContainer>
        <Container>
            <StyledLink to={`/${id}`}>
                <ImageLowRes src={imageUrl}>
                    <ImageHiRes src={imageUrlHiRes}/>
                </ImageLowRes>
                <svg viewBox="0 0 304 64">
                    <foreignObject width="100%" height="100%">
                        <Name>{name}</Name>
                        <Type>{types.join(', ')}</Type>
                    </foreignObject>
                </svg>  
            </StyledLink>
        </Container>
    </OuterContainer>
);

export default ListingCard;
