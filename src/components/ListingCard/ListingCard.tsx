import React, { useState, useEffect } from 'react';

import { Card } from '../../models';
import {
    Container,
    ImageLowRes,
    ImageHiRes, 
    ImageSpinner,
    Name,
    StyledLink,
    Type
} from './ListingCard.styles';
import { preloadImage } from '../../utils';

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
}) => {

    const [ imageLoaded, setImageLoaded ] = useState(false);
    useEffect(() => {
        const subscription = preloadImage(imageUrlHiRes)
            .subscribe({ complete: () => setImageLoaded(true) });
        return () => { subscription.unsubscribe() };
    }, [ imageUrlHiRes, setImageLoaded ]);

    return (
        <OuterContainer>
            <Container>
                <StyledLink to={`/${id}`}>
                    <ImageLowRes src={imageUrl}>
                        <ImageHiRes src={imageUrlHiRes}/>
                        <ImageSpinner hidden={imageLoaded}/>
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
}

export default ListingCard;
