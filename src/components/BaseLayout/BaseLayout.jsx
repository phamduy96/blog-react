import React, { useState } from 'react';
import { Layout, Menu, Drawer, Row, Col } from 'antd';
import { MenuOutlined, LogoutOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import "../BaseLayout/BaseLayout.css"
import logoHeader from "../../vendor/img/nodejsLogo.png"
import axios from 'axios';
import { useHistory } from "react-router-dom"
import Cookies from "js-cookie"
const { Header, Content, Footer } = Layout;

function BaseLayout(props) {
  let history = useHistory()
  let [visibleDrawer, setVisibleDrawer] = useState(false)
  const showDrawer = () => {
    setVisibleDrawer(true)
  };
  const onClose = () => {
    setVisibleDrawer(false)
  }
  const drawer = (
    <Drawer
      title="NODEJS"
      placement="left"
      closable={false}
      onClose={onClose}
      visible={visibleDrawer}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  )
  return (
    <Layout className="layout">
      <Header>
        {drawer}
        <span><img className="logo-header" src={logoHeader} alt="" /></span>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} className="baselayout-header">
          <Menu.Item key="1"></Menu.Item>
          <Menu.Item key="2" onClick={showDrawer} className="baselayout-header-response"><MenuOutlined /></Menu.Item>
        </Menu>
        <button className="baselayout-header-logout" onClick={()=>{
          axios({
            method: "POST",
            url: "/user/logout"
          })
          .then((res)=>{
            console.log(res);
            Cookies.remove("token")
            history.push("/login")
          })
        }}>Đăng Xuất</button>
      </Header>
      <Content className="site-layout-background ant-layout-content">
        <Row justify="center content">
          <Col xs={props.xs ? props.xs : 23} sm={props.sm ? props.sm : 23}
            style={{ padding: "0 0" }}>
            <div className="site-layout-content">
              {
                props.children
              }
            </div>
          </Col>
        </Row>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
    </Layout>
  );
}

export default BaseLayout;