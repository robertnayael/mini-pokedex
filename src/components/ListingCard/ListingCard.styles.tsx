import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    border: 1px solid lightgray;
    background: #fff;
    backface-visibility: hidden;
    box-shadow: 0.15rem 0.15rem 0.25rem rgba(0,0,0,0.1);
    transition: transform 250ms,
                box-shadow 250ms;
    &:hover {
        transform: scale(1.025) rotate(2deg);
        box-shadow: 0.25rem 0.25rem 0.25rem rgba(0,0,0,0.1);
    }
`;

export const StyledLink = styled(Link)`
    display: block;
    height: 100%;
    text-decoration: none;
    color: #5a5252;
`;

export const ImageLowRes = styled(
    ({ src, ...props }) => <div {...props} />
)<{ src: string }>`
    display: block;
    position: relative;
    width: 90%;
    padding-top: 100%;
    margin: 5% 5% 2.5% 5%;
    border: 1px solid darkgray;
    background-image: url('${p => p.src}');
    background-repeat: no-repeat;
    background-size: 200%;
    background-position: 50% 15%;
`;

export const ImageHiRes = styled(ImageLowRes)`
    position: absolute;
    top: -1px;
    left: -1px;
    margin: 0;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
`;

export const ImageContainer = styled.div``;


export const Name = styled.span`
    display: block;
    font-size: 28px;
    line-height: 32px;
    font-weight: 500;
    text-align: center;

`;

export const Type = styled.span`
    display: block;
    font-size: 24px;
    line-height: 32px;
    font-weight: normal;
    text-align: center;

`;
