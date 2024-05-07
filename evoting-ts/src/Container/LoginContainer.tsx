import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const LoginForm: React.FC<{ updateUsername: (name: string) => void }> = ({ updateUsername }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/admin/login', values);
      const userData = response.data;
      Object.keys(userData).forEach(key => {
        localStorage.setItem(key, userData[key]);
      });
      updateUsername(userData.username);
      message.success('Login successful');
    } catch (error) {
      message.error('Login failed');
    }
    setLoading(false);
  };

  return (
    <Form name="login_form" onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please enter your username' }]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please enter your password' }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
