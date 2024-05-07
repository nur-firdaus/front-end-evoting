import React, { useState } from 'react';
import { Modal, Table } from 'antd';
import axios from 'axios';

interface Props {
  visible: boolean;
  onCancel: () => void;
  content: Voter[];
}

interface Election {
  election_id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

interface Voter {
  voter_id: number;
  full_name: string;
  username: string;
  password: string;
  email: string;
  date_of_birth: string;
  address: string;
  is_admin: number;
  created_at: string;
  updated_at: string;
}
const ElectionsDetailContainer: React.FC<Props> = ({ visible, onCancel, content }) => {
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

  return (
    <Modal
      title="Voter Details"
      visible={visible}
      onCancel={onCancel}
      footer={null}
      width="90%"
      bodyStyle={{ height: '80vh', overflowY: 'scroll' }}
    >
      <Table dataSource={content} columns={columns} rowKey="voter_id" />
    </Modal>
  );
};
export default ElectionsDetailContainer;
