import React from 'react';

import { Card } from '../../models';
import { Container, Image, Name, Placeholder, StyledLink, Type } from './ListingCard.styles';

interface ListingCardProps extends Card {};

const ListingCard: React.FC<ListingCardProps> = ({ id, name, types, imageUrl, imageUrlHiRes }) => (
    <Container>
        <StyledLink to={`/${id}`}>
            <Placeholder src={imageUrl}>
                <Image src={imageUrlHiRes}/>
            </Placeholder>
            <Name>{name}</Name>
            <Type>{types.join(', ')}</Type>
        </StyledLink>
    </Container>
);

export default ListingCard;
