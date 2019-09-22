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
    SimilarCardsList,
    SimilarCardContent,
    SimilarCardPlaceholder
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
            <SimilarCards cards={similarCards}/>
        </div>
    </Details>
);

const SimilarCards: React.FC<{ cards: Card[] | null }> = ({ cards }) => {
    const content = cards
        ? cards.map(card => (
            <SimilarCard key={card.id}>
                <ListingCard {...card} container={SimilarCardContent}/>
            </SimilarCard>
        ))
        : Array(3).fill(null).map((_, i) => (
            <SimilarCard key={i}>
                <SimilarCardPlaceholder style={{
                    animationDelay: `${i * 300}ms`
                }}/>
            </SimilarCard>
        ));

    return (
        <SimilarCardsList>
            {content}
        </SimilarCardsList>
    );
}

const SimilarCard: React.FC = ({ children }) => (
    <SimilarCardOuter>
        <SimilarCardInner>
            <SimilarCardContent>
                {children}
            </SimilarCardContent>
        </SimilarCardInner>
    </SimilarCardOuter>
);

export default CardDetails;
