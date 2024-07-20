import React, { useEffect, useState } from 'react';
import { Table, Modal, Button } from 'antd';
import axios from 'axios';
import ElectionsDetailContainer from './ElectionsDetailContainer';
import ElectionsDetailContainerVoter from './ElectionsDetailContainerVoter';
import AutoRefreshContainer from './AutoRefreshContainer';
import ElectionFormContainer from './ElectionFormContainer';

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

const ElectionsBatchContainer: React.FC = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<any>(null);
  const [showList, setShowList] = useState<Boolean>(false);
  const [role, setRole] = useState<string | null>(localStorage.getItem('Role'));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://voting.faesoftwaresolution.com/api/elections');
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
      const response = await axios.get(`https://voting.faesoftwaresolution.com/api/elections/${election.election_id}/voters`);
      setModalContent(response.data);
      localStorage.setItem("ElectionId", election.election_id.toLocaleString());
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching election details:', error);
    }
  };

  
  const handleOnCancel = async () => {
    try {
      setModalVisible(false);
      localStorage.setItem("ElectionId", '');
    } catch (error) {
      console.error('Error fetching election details:', error);
    }
  };

  return (
    <>
    <div>
      <h1>Election List Batch</h1>
      <Table dataSource={elections} columns={columns} />
      {role=='Admin'?(
              
              <>
              <ElectionsDetailContainer
              visible={modalVisible}
              onCancel={() => handleOnCancel()}
              content={modalContent}/>
              </>
               ):(
                 <ElectionsDetailContainerVoter
                 visible={modalVisible}
                 onCancel={() => handleOnCancel()}
                 content={modalContent}
               />
         )}
    </div>
    </>
  );
};

export default ElectionsBatchContainer;
