import React from 'react';

import { Card } from '../../models';
import {
    Details,
    Image,
    ImagePlaceholder,
    Properties,
    Property,
    PropertyName,
    PropertyValue,
    TopWrapper,
    Weakness,
    Weaknesses,
    SimilarCardsHeader,
    SimilarCardOuter,
    SimilarCardInner,
    SimilarCards,
    SimilarCardContent
} from './CardDetails.styles';
import { ListingCard } from '..';

interface CardDetailsProps extends Card {
    similarCards: Card[] | null;
}

const CardDetails: React.FC<CardDetailsProps> = ({
    id,
    name,
    supertype,
    series,
    types,
    rarity,
    nationalPokedexNumber,
    hp,
    set,
    weaknesses,
    attacks,
    evolvesFrom,
    imageUrlHiRes,
    similarCards,
}) => (
    <Details>
        <TopWrapper>
            <ImagePlaceholder>
                <Image src={imageUrlHiRes}/>
            </ImagePlaceholder>
            <Properties>
                <Property long>
                    <PropertyName>Name</PropertyName>
                    <PropertyValue>{name}</PropertyValue>
                </Property>
                <Property>
                    <PropertyName>Supertype</PropertyName>
                    <PropertyValue>{supertype}</PropertyValue>
                </Property>
                <Property>
                    <PropertyName>Identifier</PropertyName>
                    <PropertyValue>{id}</PropertyValue>
                </Property>
                <Property>
                    <PropertyName>Series</PropertyName>
                    <PropertyValue>{series}</PropertyValue>
                </Property>
                <Property>
                    <PropertyName>{types.length > 1 ? 'Types' : 'Type'}</PropertyName>
                    <PropertyValue>{types.join(', ')}</PropertyValue>
                </Property>
                {
                    rarity &&
                    <Property>
                        <PropertyName>Rarity</PropertyName>
                        <PropertyValue>{rarity}</PropertyValue>
                    </Property>
                }
                <Property>
                    <PropertyName>National Pokédex No.</PropertyName>
                    <PropertyValue>{nationalPokedexNumber}</PropertyValue>
                </Property>
                <Property>
                    <PropertyName>HP</PropertyName>
                    <PropertyValue>{hp}</PropertyValue>
                </Property>
                <Property>
                    <PropertyName>Set</PropertyName>
                    <PropertyValue>{set}</PropertyValue>
                </Property>
                {
                    evolvesFrom &&
                    <Property>
                        <PropertyName>Evolves from</PropertyName>
                        <PropertyValue>{evolvesFrom}</PropertyValue>
                    </Property>
                }
                <Property long>
                    <PropertyName>{weaknesses.length > 1 ? 'Weaknesses' : 'Weakness'}</PropertyName>
                    <PropertyValue>
                        <Weaknesses>
                            {weaknesses.map(({ type, value }) => <Weakness key={type}>{`${type}: ${value}`}</Weakness>)}
                        </Weaknesses>
                    </PropertyValue>
                </Property>
            </Properties>
        </TopWrapper>

        <SimilarCardsHeader>Similar cards:</SimilarCardsHeader>
        <div>
            <SimilarCards>
                {
                    similarCards && similarCards.map(card => (
                        <SimilarCardOuter key={card.id} >
                            <SimilarCardInner>
                                <SimilarCardContent>
                                    <ListingCard {...card} container={SimilarCardContent}/>
                                </SimilarCardContent>
                            </SimilarCardInner>
                        </SimilarCardOuter>
                    ))
                }
            </SimilarCards>
        </div>

    </Details>
);

export default CardDetails;
