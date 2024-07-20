import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface VoteData {
    candidate_id: number;
    vote_count: number;
}

interface VoteChartProps {
    election_id: String|null;
}

const VoteChartRealtime: React.FC<VoteChartProps> = ({ election_id }) => {
    const [voteData, setVoteData] = useState<VoteData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const response = await axios.post('https://voting.faesoftwaresolution.com/api/vote-counts', {
                election_id
            });
            setVoteData(response.data);
        } catch (err) {
            setError('Failed to fetch vote data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, 5000);

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [election_id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={voteData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="candidate_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="vote_count" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default VoteChartRealtime;
