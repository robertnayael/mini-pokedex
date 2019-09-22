import React from 'react';

import {
    Properties,
    PropertyPlaceholder,
} from './CardDetails.styles';


const CardPropertiesPlaceholder: React.FC = () => (
    <Properties>
        <PropertyPlaceholder long />
        {Array(14).fill(null).map(() =>
            <PropertyPlaceholder/>
        )}
    </Properties>
);

export default CardPropertiesPlaceholder;
