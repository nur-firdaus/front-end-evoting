// ElectionsContainer.tsx or ElectionsDetailContainer.tsx

import React from 'react';
import AutoRefreshContainer from './AutoRefreshContainer';

const ElectionsDetailContainer: React.FC = () => {
    const electionId = 1; // Replace with actual election ID

    return (
        <div>
            <h1>Election Details</h1>
            {/* Other content */}
            <AutoRefreshContainer electionId={null} />
        </div>
    );
};

export default ElectionsDetailContainer;
