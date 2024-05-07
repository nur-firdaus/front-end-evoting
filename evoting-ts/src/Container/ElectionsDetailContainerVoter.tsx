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

const ElectionsDetailContainerVoter: React.FC<Props> = ({ visible, onCancel, content }) => {
    const [electionId, setElectionId] = useState<string | null>(localStorage.getItem('ElectionId'));
    const [voterId, setVoterId] = useState<string | null>(localStorage.getItem('id'));
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setElectionId(localStorage.getItem('ElectionId'))
        setVoterId(localStorage.getItem('id'))
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://127.0.0.1:8000/api/elections/${electionId}/candidates`);
            setCandidates(response.data);
          } catch (error) {
            console.error('Error fetching candidates:', error);
          }
        };
    
        fetchData();
        setLoading(false);
      }, [electionId,visible,voterId]);
      
      const handleVote = async (candidateId: number) => {
        try {
          await axios.get(`http://127.0.0.1:8000/api/save-vote/${voterId}/${candidateId}/${electionId}`);
          message.success('Vote saved successfully!');
        } catch (error) {
          console.error('Error saving vote:', error);
          message.error('Failed to save vote. Please try again.');
        }
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
        render: (text: any, record: Candidate) => (
          <Button type="primary" onClick={() => handleVote(record.candidate_id)}>
            Vote
          </Button>
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
