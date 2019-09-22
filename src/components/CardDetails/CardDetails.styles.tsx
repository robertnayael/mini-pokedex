import React from 'react';
import styled, { keyframes } from "styled-components";

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
`;

const shimmer = keyframes`
    0%{
        background-position: 0% 0;
    }
    25%, 100% {
        background-position: 100% 0;
    }
`;

export const ImagePlaceholder = styled.div`
    align-self: flex-end;
    position: relative;
    width: 30%;
    padding-top: calc(30% * 1.4);
    animation-duration: 2s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: ${shimmer};
    animation-timing-function: linear;
    background: darkgray;
    background: linear-gradient(to right, #dddddd 40%, #e6e6e6 50%, #dddddd 60%);
    background-size: 300% 100%;
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
    ({long, ...props}) => <li {...props}/>
)<{ long?: boolean }>`
    display: block;
    width: ${p => p.long ? 100 : 50}%;
    margin-bottom: 0.5rem;
    &:first-child {
        font-size: 1.3em;
    }
`;

export const PropertyName = styled.span`
    display: block;
    white-space: nowrap;
    font-weight: 400;
    &:after {
        content: ':';
    }
`;

export const PropertyValue = styled.span`
    display: block;
    white-space: nowrap;
    font-weight: 500;
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

export const SimilarCards = styled.ul`
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