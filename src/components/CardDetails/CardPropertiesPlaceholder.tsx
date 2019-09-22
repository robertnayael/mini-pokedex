import React from 'react';

import {
    Properties,
    PropertyPlaceholder,
    Property,
    PropertyName,
    PropertyValue,
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
