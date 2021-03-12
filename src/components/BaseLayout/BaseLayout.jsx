import React, { useState } from 'react';
import { Layout, Menu, Drawer, Row, Col, Avatar } from 'antd';
import { MenuOutlined, LogoutOutlined, UploadOutlined, UserOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import "../BaseLayout/BaseLayout.css"
import logoHeader from "../../vendor/img/logo2Baselayout.png"
import axios from 'axios';
import { useHistory } from "react-router-dom"
import Cookies from "js-cookie"
const { Header, Content, Footer } = Layout;

function BaseLayout(props) {
  let history = useHistory()
  let [visibleDrawer, setVisibleDrawer] = useState(false)
  let user = JSON.parse(localStorage.getItem('user'));
  let [showBaseLayoutSelect, setShowBaseLayoutSelect] = useState("")

  const showDrawer = () => {
    setVisibleDrawer(true)
  };
  const onClose = () => {
    setVisibleDrawer(false)
  }
  const showSelect = ()=> {
    if(showBaseLayoutSelect){
      setShowBaseLayoutSelect("")
    }else{
      setShowBaseLayoutSelect({
        display: "block"
      })
    }
  }
  const drawer = (
    <Drawer
      title="NODEJS"
      placement="left"
      closable={false}
      onClose={onClose}
      visible={visibleDrawer}
      className="baselayout-drawer"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p className="baselayout-drawerlogout"><LogoutOutlined></LogoutOutlined> Đăng Xuất</p>
    </Drawer>
  )
  const day = new Date().getDay();
  let day_name = ""
  function getDay(day) {
    switch (day) {
      case 0:
        return  day_name = "Chủ nhật";
          break;
      case 1:
        return  day_name = "Thứ hai";
          break;
      case 2:
        return  day_name = "Thứ ba";
          break;
      case 3:
        return  day_name = "Thứ tư";
          break;
      case 4:
        return  day_name = "Thứ năm";
          break;
      case 5:
        return  day_name = "Thứ sau";
          break;
      case 6:
        return  day_name = "Thứ bảy";
      }
  }
  getDay(day)

  return (
    <Layout className="layout">
      <Header className="header">
        {drawer}
        <span><img className="logo-header" src={logoHeader} alt="" /></span>
        <span className="baselayout-time"> {day_name } : {new Date(Date.now()).toLocaleDateString()}</span>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} className="baselayout-header">
          <Menu.Item key="1">Mới nhất</Menu.Item>
          <Menu.Item key="2">International</Menu.Item>
        </Menu>
        <span onClick={showDrawer} className="baselayout-header-response"><MenuOutlined /></span>
        { user.avatar ? user.avatar.length === 1 ? <Avatar className="baselayout-header-select" onClick={showSelect}>{user.avatar.toUpperCase()}</Avatar> : 
          <Avatar className="baselayout-header-select" src={`${user.avatar}`} onClick={showSelect}></Avatar> : <Avatar className="baselayout-header-select" icon={<UserOutlined></UserOutlined>} onClick={showSelect}></Avatar>
        }
        <div style={showBaseLayoutSelect ? showBaseLayoutSelect : {}} className="baselayout-select">
              <p onClick={()=>{
                axios({
                  method: "POST",
                  url: "/user/logout"
                })
                .then((res)=>{
                  Cookies.remove("token")
                  history.push("/login")
                })
              }}><span><Avatar icon={<LogoutOutlined></LogoutOutlined>}></Avatar></span> <span>Đăng Xuất</span></p>
              <p onClick={()=>{
                history.push("/updateAvatar")
              }}><span><Avatar icon={<UploadOutlined></UploadOutlined>}></Avatar></span>Cập nhật Avatar</p>
            </div>
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