import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
    0%{
        background-position: 0% 0;
    }
    25%, 100% {
        background-position: -150% 0;
    }
`;

const Placeholder = styled.div`
    animation-duration: 2s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: ${shimmer};
    animation-timing-function: linear;
    background: darkgray;
    background: linear-gradient(to right, #dddddd 40%, #e6e6e6 50%, #dddddd 60%);
    background-size: 300% 100%;
`;

export default Placeholder;
