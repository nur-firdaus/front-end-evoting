import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { SubMenu } = Menu;

const NavBar: React.FC = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />}>
      <Link to="/">Home</Link>
      </Menu.Item>
      <SubMenu key="sub1" icon={<UserOutlined />} title="Profile">
        <Menu.Item key="profile:1"><Link to="/">My Profile</Link></Menu.Item>
        <Menu.Item key="profile:2">Settings</Menu.Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<SettingOutlined />} title="Options">
        <Menu.Item key="options:1">Option 1</Menu.Item>
        <Menu.Item key="options:2">Option 2</Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default NavBar;
