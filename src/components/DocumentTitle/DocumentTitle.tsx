import React from 'react';
import Helmet from 'react-helmet';

interface DocumentTitleProps {
    children: string;
}

const DocumentTitle: React.FC<DocumentTitleProps> = ({ children: title }) => (
    <Helmet>
        <title>{title}</title>
    </Helmet>
);

export default DocumentTitle;
