// AutoRefreshContainer.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';

interface Voter {
    id: number;
    name: string;
    // Add other voter properties as needed
}

interface Props {
    electionId: String|null;
}

const AutoRefreshContainer: React.FC<Props> = ({ electionId }) => {
    const [voters, setVoters] = useState<Voter[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const columns = [
        {
          title: 'Voter ID',
          dataIndex: 'voter_id',
          key: 'voter_id',
        },
        {
          title: 'Full Name',
          dataIndex: 'full_name',
          key: 'full_name',
        },
        {
          title: 'Username',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'Date of Birth',
          dataIndex: 'date_of_birth',
          key: 'date_of_birth',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
        {
          title: 'Is Admin',
          dataIndex: 'is_admin',
          key: 'is_admin',
          render: (isAdmin: number) => (isAdmin ? 'Yes' : 'No'),
        },
        {
          title: 'Created At',
          dataIndex: 'created_at',
          key: 'created_at',
        },
        {
          title: 'Updated At',
          dataIndex: 'updated_at',
          key: 'updated_at',
        },
      ];
    const fetchVoters = async () => {
        try {
            const response = await axios.get(`https://voting.faesoftwaresolution.com/api/elections/${electionId}/voters`);
            setVoters(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch voters');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVoters(); // Initial fetch

        const interval = setInterval(() => {
            fetchVoters();
        }, 5000); // Fetch data every 5 seconds

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, [electionId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Voters List</h1>
           
      <Table dataSource={voters} columns={columns} rowKey="voter_id" />
        </div>
    );
};

export default AutoRefreshContainer;
