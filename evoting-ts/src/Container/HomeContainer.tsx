import React, { ReactElement, useState, useEffect  } from 'react'
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import Login from './LoginContainer';
import Listing from '../Component/ElectionsContainer';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import LoginForm from './LoginContainer';


const { Header, Content, Footer } = Layout;

const items = new Array(5).fill(null).map((_, index) => ({
  key: index + 1,
  label: `nav ${index + 1}`,
}));


const Home: React.FC = () => {

  const [username, setUsername] = useState<string | null>(localStorage.getItem('username'));
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  
  const updateUsername = (name: string) => {
    setUsername(name);
  };

  return (
    <>
      {username ? (
           <Layout>
           <NavBar/>
           <Content style={{ padding: '0 48px' }}>
             <Breadcrumb style={{ margin: '16px 0' }}>
               <Breadcrumb.Item>Home</Breadcrumb.Item>
               <Breadcrumb.Item>List</Breadcrumb.Item>
               <Breadcrumb.Item>App</Breadcrumb.Item>
             </Breadcrumb>
             <Outlet />
           </Content>
           <Footer style={{ textAlign: 'center' }}>
             Ant Design ©{new Date().getFullYear()} Created by Ant UED
           </Footer>
         </Layout>
      ) : (
        <LoginForm updateUsername={updateUsername} />
      )}
    </>
  );
};

export default Home;