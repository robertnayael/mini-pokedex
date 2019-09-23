import React from 'react';

import {
    Properties,
    PropertyPlaceholder,
} from './CardDetails.styles';


const CardPropertiesPlaceholder: React.FC = () => (
    <Properties>
        <PropertyPlaceholder long />
        {Array(14).fill(null).map((_, i) =>
            <PropertyPlaceholder key={i}/>
        )}
    </Properties>
);

export default CardPropertiesPlaceholder;
