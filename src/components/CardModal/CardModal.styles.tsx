import React from 'react';
import styled, { keyframes, Keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

export const Backdrop = styled(
    ({ visible, ...props }) => <Link {...props}/> // This is to avoid passing `visible` prop to <Link> component
)<{ visible: boolean }>`
    display: block;
    opacity: ${p => Number(p.visible)};
    transition: opacity 250ms;
    pointer-events: ${p => p.visible ? 'auto' : 'none'};
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    cursor: auto;
`;

const modalEnter = keyframes`
    0%   { transform: translate(-50%, -100vh) rotate(-10deg); }
    70% { transform: translate(-50%, -45%); }
    100% { transform: translate(-50%, -50%); }
`;

const modalLeave = keyframes`
    from {
        transform: translate(-50%, -50%);
    }
    to {
        transform: translate(-50%, 100vh) rotate(-10deg);
    }
`;

interface ModalProps {
    isOpen: boolean;
    wasOpenEver: boolean;
}

interface ExtModalProps {
    animationName: string | Keyframes,
    animationDuration: string;
    pointerEvents: string;
}

export const Modal = styled.div.attrs<ModalProps, ExtModalProps>(
    p => ({
        animationName: p.wasOpenEver ? ( p.isOpen ? modalEnter : modalLeave ) : 'none',
        animationDuration: `${p.isOpen ? 250 : 500}ms`,
        pointerEvents: p.isOpen ? 'auto' : 'none'
    })
)<ModalProps>`
    position: fixed;
    z-index: 2;
    top: 50%;
    left: 50%;
    width: 50rem;
    max-width: 90vw;
    max-height: 90vh;
    transform: translate(-50%, 100vh);
    animation-fill-mode: forwards;
    animation-name: ${p => p.animationName};
    animation-duration: ${p => p.animationDuration};
    pointer-events: ${p => p.pointerEvents};
    box-shadow: 0 1rem 2rem rgba(0,0,0,0.3),
                0 1rem 0.75rem rgba(0,0,0,0.2);

`;

export const CloseButton = styled(Link)`
    position: absolute;
    display: inline-block;
    right: .5rem;
    top: .5rem;
    width: 3rem;
    height: 3rem;
    overflow: hidden;
    &:hover {
        &::before, &::after {
            background: rgb(131,16,16);
        }
    }
    &:active {
            &::before {
                transform: rotate(45deg) scale(1.1);
            }
            &::after {
                transform: rotate(-45deg) scale(1.1);
            }
    }
    &::before, &::after {
        content: '';
        position: absolute;
        width: 100%;
        top: 50%;
        left: 0;
        background: #5a5252;
        height: 0.5rem;
        margin-top: -0.2rem;
        border-radius:  0.315rem;
        transition: transform 200ms, background 200ms;
    }
    &::before {
        transform: rotate(45deg);
    }
    &::after {
        transform: rotate(-45deg);
    }
`;
