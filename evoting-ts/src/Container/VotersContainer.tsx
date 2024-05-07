import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from 'antd';

const { Title } = Typography;

interface Voter {
  vote_id: number;
  voter_id: number;
  candidate_id: number;
  election_id: number;
  created_at: string;
  updated_at: string;
}

const VotersContainer: React.FC<{ electionId: string }> = ({ electionId }) => {
  const [voters, setVoters] = useState<Voter[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/elections/${electionId}/voters`);
        setVoters(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [electionId]);

  return (
    <div>
      <Title level={2}>Voters for Election {electionId}</Title>
      <ul>
        {voters.map(voter => (
          <li key={voter.vote_id}>
            Voter ID: {voter.voter_id}, Candidate ID: {voter.candidate_id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VotersContainer;
