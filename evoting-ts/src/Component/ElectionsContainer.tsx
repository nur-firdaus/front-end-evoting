import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListingComponent, { Election } from '../Container/ElectionContainer';
import { Spin } from 'antd';

const baseURL = 'http://127.0.0.1:8000/api';

const App: React.FC = () => {
    const [elections, setElections] = useState<Election[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        // Function to fetch elections data
        async function fetchElections() {
            try {
                setLoading(true);
                const response = await axios.get(`${baseURL}/elections`);
                setElections(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching elections:', error);
            }
            setLoading(false);
        }

        // Call fetchElections when component mounts
        fetchElections();
    }, []);

    return (
        <div>
        <Spin tip="Loading..." spinning={loading}>
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
        </Spin>
        </div>
        
    );
}

export default App;
