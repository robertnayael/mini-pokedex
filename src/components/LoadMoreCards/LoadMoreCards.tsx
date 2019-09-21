import React, { useRef, useEffect } from 'react';

interface LoadMoreCardsProps {
    phantomItems: number;
    onVisible: () => void;
}

export const LoadMoreCards: React.FC<LoadMoreCardsProps> = ({
    phantomItems,
    onVisible
}) => {

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver(([{ isIntersecting }]) => {
            isIntersecting && onVisible();
        });
        intersectionObserver.observe(ref.current!);
        return () => intersectionObserver.disconnect();
    }, [ onVisible ]);

    return <div ref={ref}>load more...</div>;
};

export default LoadMoreCards;
