import React, { useState } from 'react';
import { Form, Input, Button, message, Row, Col, Flex, Card, Typography } from 'antd';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import GameComponent from './GameComponent';

const LoginForm: React.FC<{ updateUsername: (name: string) => void }> = ({ updateUsername }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const response = await axios.post('https://voting.faesoftwaresolution.com/api/admin/login', values);
      const userData = response.data;
      Object.keys(userData).forEach(key => {
        localStorage.setItem(key, userData[key]);
      });
      localStorage.setItem("Role", "Admin");
      updateUsername(userData.username);
      message.success('Login successful');
    } catch (error) {
      message.error('Login failed');
    }
    setLoading(false);
    navigate('/list-batch');
  };

  const onFinishVoter = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const response = await axios.post('https://voting.faesoftwaresolution.com/api/voter/login', values);
      const userData = response.data;
      Object.keys(userData).forEach(key => {
        localStorage.setItem(key, userData[key]);
      });
      localStorage.setItem("Role", "Voter");
      updateUsername(userData.username);
      message.success('Login successful');
    } catch (error) {
      message.error('Login failed');
    }
    setLoading(false);
    navigate('/list-batch');
  };
  const cardStyle: React.CSSProperties = {
    width: 620,
  };
  
  const imgStyle: React.CSSProperties = {
    display: 'block',
    width: 273,
  };
  return (
    <>
      <GameComponent/>
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
          <Col span={12}>
            <Card hoverable style={cardStyle} styles={{ body: { padding: 0, overflow: 'hidden' } }}>
              <Flex justify="space-between">
                <img
                  alt="avatar"
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  style={imgStyle} />
                <Flex vertical align="flex-end" justify="space-between" style={{ padding: 32 }}>
                  Login as Voter
                  <Form name="login_form" onFinish={onFinishVoter} layout="vertical">
                      <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please enter your username' }]}
                      >
                        <Input placeholder="Username" />
                      </Form.Item>
                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password' }]}
                      >
                        <Input.Password placeholder="Password" />
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                          Log in
                        </Button>
                      </Form.Item>
                  </Form>
                </Flex>
              </Flex>
            </Card>
          </Col>
        </Row>
        <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
          <Col span={12}>
            <Card hoverable style={cardStyle} styles={{ body: { padding: 0, overflow: 'hidden' } }}>
              <Flex justify="space-between">
                <img
                  alt="avatar"
                  src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  style={imgStyle} />
                <Flex vertical align="flex-end" justify="space-between" style={{ padding: 32 }}>
                  Login as Admin
                  <Form name="login_form" onFinish={onFinish} layout="vertical">
                      <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please enter your username' }]}
                      >
                        <Input placeholder="Username" />
                      </Form.Item>
                      <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password' }]}
                      >
                        <Input.Password placeholder="Password" />
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                          Log in
                        </Button>
                      </Form.Item>
                  </Form>
                </Flex>
              </Flex>
            </Card>
          </Col>
        </Row>
      </>
  );
};

export default LoginForm;
