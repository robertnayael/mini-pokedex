import styled from "styled-components";

export const Details = styled.div`
    background: #fff;
    height: 100%;
    padding: 2rem;

    @media only screen and (max-width: 768px) {
        font-size: 0.5rem;
    }
`;

export const Image = styled.img`
    width: 50%;
    height: calc(50% * 1.4);
    border-radius: 1rem;
    background: #d3d3d3;
    box-shadow: 0 0 0.5rem rgba(0,0,0,0.3);
`;

export const Properties = styled.dl`
    margin-left: 2rem;
`;

export const PropertyName = styled.dt`
    margin: 0.5rem 0 0.15rem 0;
    &:after {
        content: ':';
    }
`;

export const Property = styled.dd`
    font-weight: 500;
`;

export const TopWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Weaknesses = styled.ul`
    list-style: none;
`;

export const Weakness = styled.li`

`;