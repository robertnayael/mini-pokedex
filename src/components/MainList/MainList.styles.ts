import styled from 'styled-components';
import { Placeholder } from '../';

export const List = styled.ul`
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    width: 61rem;
    min-width: 320px;
    max-width: 100vw;
    padding: 0.5rem;
    justify-content: center;
`;

export const Header = styled.h1`
    margin: 2rem auto;
    transform: translateX(1rem);
    width: 61rem;
    min-width: 320px;
    max-width: 100vw;
    font-size: 3rem;
    color: #fff;
    text-shadow: 3px 3px 0px #000;
    letter-spacing: 2px;
`;

export const CardContainer = styled.li`
    display: block;
    height: 25rem;
    width: 19rem;
    margin: 0.5rem;
    list-style: none;
`;

export const CardPlaceholder = styled(Placeholder)`
    height: 25rem;
    width: 19rem;
    margin: 0.5rem;
`;

export const PhantomItem = styled.li`
    display: block;
    width: 19rem;
`;
