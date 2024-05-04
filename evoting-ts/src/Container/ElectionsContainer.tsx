import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListingComponent from '../Container/ElectionContainer';

const baseURL = 'http://127.0.0.1:8000/api';

const App: React.FC = () => {
    const [elections, setElections] = useState([]);

    useEffect(() => {
        // Function to fetch elections data
        async function fetchElections() {
            try {
                const response = await axios.get(`${baseURL}/elections`);
                setElections(response.data);
            } catch (error) {
                console.error('Error fetching elections:', error);
            }
        }

        // Call fetchElections when component mounts
        fetchElections();
    }, []);

    return (
        <div>
            <ListingComponent elections={elections} />
        </div>
    );
}

export default App;
