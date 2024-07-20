import React, { useEffect, useState } from 'react';
import { Button, Modal, Spin, Table, message } from 'antd';
import axios from 'axios';
import { Voter } from './ElectionsDetailContainer';

interface Props {
  visible: boolean;
  onCancel: () => void;
  content: Voter[];
}

interface Candidate {
    candidate_id: number;
    full_name: string;
    position: string;
    created_at: string;
    updated_at: string;
    id: number;
    election_id: number;
}

interface Vote{
  vote_id: number;
  voter_id: number;
  candidate_id: number;
  election_id: number;
  created_at: string;
  updated_at: string;
}

const ElectionsDetailContainerVoter: React.FC<Props> = ({ visible, onCancel, content }) => {
    const [electionId, setElectionId] = useState<string | null>(localStorage.getItem('ElectionId'));
    const [voterId, setVoterId] = useState<string | null>(localStorage.getItem('id'));
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(false);
    const [doneVote, isDoneVote] = useState<Vote[]>([]);

    useEffect(() => {
        setLoading(true);
        setElectionId(localStorage.getItem('ElectionId'))
        setVoterId(localStorage.getItem('id'))
        fetchData();
        setLoading(false);
      }, [electionId,visible,voterId]);

      const fetchData = async () => {
        try {
          const response = await axios.get(`https://voting.faesoftwaresolution.com/api/elections/${electionId}/candidates`);
          setCandidates(response.data);

          const response2 = await axios.get(`https://voting.faesoftwaresolution.com/api/elections/${electionId}/voters/${voterId}`);
          console.info(response2);
          isDoneVote(response2.data);
        } catch (error) {
          console.error('Error fetching candidates:', error);
        }
      };
      
      const handleVote = async (candidateId: number) => {
        try {
          await axios.get(`https://voting.faesoftwaresolution.com/api/save-vote/${voterId}/${candidateId}/${electionId}`);
          message.success('Vote saved successfully!');
        } catch (error) {
          console.error('Error saving vote:', error);
          message.error('Failed to save vote. Please try again.');
        }
        fetchData();
      };
  const columns = [
    {
      title: 'Candidate ID',
      dataIndex: 'candidate_id',
      key: 'candidate_id',
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },{
        title: 'Action',
        key: 'action',
        render: (text: any, record: Candidate) => (<>
        {doneVote.length==0?(
            <Button type="primary" onClick={() => handleVote(record.candidate_id)}>
              Vote
            </Button>):(
              <div>disable</div>)
            }
          </>
        ),
      },
  ];

  return (
    <Modal
      title="Election Details"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width="90%"
      bodyStyle={{ height: '80vh', overflowY: 'scroll' }}
    >
        <Spin spinning={loading}>
        <Table dataSource={candidates} columns={columns} rowKey="candidate_id" />
        </Spin>
    </Modal>
  );
};
export default ElectionsDetailContainerVoter;
