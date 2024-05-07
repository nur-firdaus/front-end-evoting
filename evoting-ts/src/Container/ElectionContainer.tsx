import React from 'react';

export interface Election {
    // Define the interface for the Election object
    id: number;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
}

interface ListingProps {
    elections: Election[]; // Define prop for elections data
}

const ListingComponent: React.FC<ListingProps> = ({ elections }) => {
    return (
        <div>
            <h2>Elections</h2>
            <ul>
                {elections.map(election => (
                    <li key={election.id}>
                        <strong>Title:</strong> {election.title}<br />
                        <strong>Description:</strong> {election.description}<br />
                        <strong>Start Date:</strong> {election.start_date}<br />
                        <strong>End Date:</strong> {election.end_date}<br />
                        <strong>Active:</strong> {election.is_active ? 'Yes' : 'No'}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListingComponent;
