import React, { useState } from 'react';
import { Menu, Button, message } from 'antd';
import { HomeOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import LoginForm from './LoginContainer';
import { useNavigate } from 'react-router-dom';

const { SubMenu } = Menu;

const NavBar: React.FC = () => {
  const [username, setUsername] = useState<string | null>(localStorage.getItem('username'));
  const navigate = useNavigate();

  const updateUsername = (name: string) => {
    setUsername(name);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUsername(null);
    message.success('Logged out successfully');
    navigate('/');
  };

  return (
    <>
      {username ? (
        <Menu mode="horizontal">
          <Menu.Item key="home" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title={`Welcome, ${username}`}>
            <Menu.Item key="profile:1">My Profile</Menu.Item>
            <Menu.Item key="profile:2">Settings</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<SettingOutlined />} title="Options">
            <Menu.Item key="options:1">Option 1</Menu.Item>
            <Menu.Item key="options:2">Option 2</Menu.Item>
          </SubMenu>
          <Menu.Item>
            <Button type="primary" onClick={handleLogout}>
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      ) : (
        <div>Login</div>
      )}
    </>
  );
};

export default NavBar;
