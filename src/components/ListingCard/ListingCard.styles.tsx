import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.li`
    display: block;
    height: 24rem;
    width: 19rem;
    margin: 0.5rem;
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
    color: black;
`

export const Placeholder = styled(
    ({ src, ...props }) => <div {...props} />
)<{ src: string }>`
    display: block;
    position: relative;
    width: 17rem;
    height: 17rem;
    margin: 1rem;
    border: 1px solid darkgray;
    background-image: url('${p => p.src}');
    background-repeat: no-repeat;
    background-size: 200%;
    background-position: 50% 15%;
`;

export const Image = styled(Placeholder)`
    position: absolute;
    top: -1px;
    left: -1px;
    margin: 0;
`

export const Name = styled.span`
    display: block;
    height: 2rem;
    line-height: 2rem;
    font-size: 1.8rem;
    font-weight: 500;
    text-align: center;
`;

export const Type = styled.span`
    display: block;
    height: 2rem;
    line-height: 2rem;
    font-size: 1.5rem;
    font-weight: normal;
    text-align: center;
`;
