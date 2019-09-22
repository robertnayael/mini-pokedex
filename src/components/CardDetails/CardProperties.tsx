import React from 'react';

import { Card } from '../../models';
import {
    Properties,
    Property,
    PropertyName,
    PropertyValue,
    SubProperty,
    SubProperties,
} from './CardDetails.styles';


const CardProperties: React.FC<Card> = ({
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
}) => (
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
        {
            weaknesses &&
            <Property long>
                <PropertyName>{weaknesses.length > 1 ? 'Weaknesses' : 'Weakness'}</PropertyName>
                <PropertyValue>
                    <SubProperties>
                        {weaknesses.map(({ type, value }) =>
                            <SubProperty key={type}>
                                {type}: <b>{value}</b>
                            </SubProperty>)}
                    </SubProperties>
                </PropertyValue>
            </Property>
        }
                {
            attacks &&
            <Property long>
                <PropertyName>{attacks.length > 1 ? 'Attacks' : 'Attack'}</PropertyName>
                <PropertyValue>
                    <SubProperties>
                        {attacks.map(({ name, cost, damage }) =>
                            <SubProperty key={name}>
                                <b>{name}</b> (cost: <b>{cost.join(', ')}</b> DMG: <b>{damage}</b>)
                            </SubProperty>)}
                    </SubProperties>
                </PropertyValue>
            </Property>
        }
    </Properties>
);

export default CardProperties;
