import React from 'react';

import { Card } from '../../models';
import {
    Details,
    Image,
    Properties,
    Property,
    PropertyName,
    TopWrapper,
    Weakness,
    Weaknesses
} from './CardDetails.styles';

interface CardDetailsProps extends Card {}

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
    imageUrlHiRes
}) => (
    <Details>
        <TopWrapper>
            <Image src={imageUrlHiRes}/>
            <Properties>
                <PropertyName>Name</PropertyName>
                <Property>{name}</Property>
                <PropertyName>Supertype</PropertyName>
                <Property>{supertype}</Property>
                <PropertyName>Identifier</PropertyName>
                <Property>{id}</Property>
                <PropertyName>Series</PropertyName>
                <Property>{series}</Property>
                <PropertyName>Types</PropertyName>
                <Property>{types.join(', ')}</Property>
                <PropertyName>Rarity</PropertyName>
                <Property>{rarity}</Property>
                <PropertyName>National Pokédex number</PropertyName>
                <Property>{nationalPokedexNumber}</Property>
                <PropertyName>HP</PropertyName>
                <Property>{hp}</Property>
                <PropertyName>Set</PropertyName>
                <Property>{set}</Property>
                {evolvesFrom && <PropertyName>Evolves from</PropertyName>}
                {evolvesFrom && <Property>{evolvesFrom}</Property>}
                <PropertyName>{weaknesses.length > 1 ? 'Weaknesses' : 'Weakness'}</PropertyName>
                <Property>
                    <Weaknesses>
                        {weaknesses.map(({ type, value }) => <Weakness key={type}>{`${type}: ${value}`}</Weakness>)}
                    </Weaknesses>
                </Property>
            </Properties>
        </TopWrapper>
    

    </Details>
);

export default CardDetails;
