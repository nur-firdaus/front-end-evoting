import React, { useEffect, useState } from 'react';
import { Table, Modal } from 'antd';
import axios from 'axios';
import ElectionsDetailContainer from './ElectionsDetailContainer';

export interface Election {
  election_id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

const ElectionsContainer: React.FC = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/elections');
        setElections(response.data);
      } catch (error) {
        console.error('Error fetching elections:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'election_id',
      key: 'election_id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => <a onClick={() => handleElectionDetails(record)}>{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      key: 'end_date',
    },
    {
      title: 'Is Active',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (isActive: number) => (isActive ? 'Yes' : 'No'),
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

  const handleElectionDetails = async (election: Election) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/elections/${election.election_id}/voters`);
      setModalContent(response.data);
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching election details:', error);
    }
  };

  return (
    <div>
      <h1>Election List</h1>
      <Table dataSource={elections} columns={columns} />
      <ElectionsDetailContainer
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        content={modalContent}
      />
    </div>
  );
};

export default ElectionsContainer;
