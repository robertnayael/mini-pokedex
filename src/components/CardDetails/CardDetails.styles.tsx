import React from 'react';
import styled, { keyframes } from "styled-components";
import { Placeholder } from '../';

const fadeIn = keyframes`
    from { opacity: 0 }
    to   { opacity: 1 }
`;

export const Details = styled.div`
    background: #fff;
    height: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    @media only screen and (max-width: 700px) {
        font-size: 0.6rem;
        padding: 1rem;
    }
`;

export const TopWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    animation: ${fadeIn} 1s;
`;

export const ImagePlaceholder = styled(Placeholder)`
    align-self: flex-end;
    position: relative;
    width: 30%;
    padding-top: calc(30% * 1.4);
`;

export const Image = styled.img`
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    box-shadow: 0 0 0.5rem rgba(0,0,0,0.3);
`;

export const Properties = styled.ul`
    width: calc(70% - 1rem);
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: space-between;
`;

export const Property = styled(
    ({ long, ...props }) => <li {...props}/>
)<{ long?: boolean }>`
    display: block;
    width: ${p => p.long ? 100 : 50}%;
    margin-bottom: 0.5rem;
`;

export const PropertyPlaceholder = styled(
    ({ long, ...props }) => <Placeholder as="li" {...props}/>
).attrs<{ long?: boolean }, { width: number; margin: number; }>(
    ({ long }) => {
        const randomVal = Math.round(Math.random() * 10);
        const width = (long ? 70 : 35) + randomVal;
        const margin = long ? 0 : 50 -width;
        return { width, margin };
    }
)<{ long?: boolean }>`
    width: ${p => p.width}%;
    margin-right: ${p => p.margin}%;
    height: 2rem;
    margin-bottom: 0.5rem;
    border-radius: 0.5rem;
`;

export const PropertyName = styled.span`
    display: block;
    white-space: nowrap;
    font-weight: 400;
    &:after {
        content: ':';
    }
    li:first-child > & {
        font-size: 1.4em;
    }
`;

export const PropertyValue = styled.span`
    display: block;
    white-space: nowrap;
    font-weight: bold;
    li:first-child > & {
        font-size: 1.8em;
    }
`;

export const Weaknesses = styled.ul`
    list-style: none;
`;

export const Weakness = styled.li``;

export const SimilarCardsHeader = styled.h2`
    line-height: 3em;
    font-size: 1.5em;
    font-weight: 500;
`;

export const SimilarCardsList = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const SimilarCardOuter = styled.li`
    display: block;
    width: 30%;
    height: 100%;
`;

export const SimilarCardInner = styled.div`
    width: 100%;
    padding-top: 132%;
    position: relative;
`;

export const SimilarCardContent = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

export const SimilarCardPlaceholder = styled(Placeholder)`
    width: 100%;
    height: 100%;
`;
