import React, { useState } from 'react';
import { Upload, message, Button, Avatar , Row, Col,Modal, } from 'antd';
import { UploadOutlined,CameraFilled } from '@ant-design/icons';
import axios from 'axios';
import './UpdateAvarta.css'
import BaseLayout from "../../components/BaseLayout/BaseLayout1"

function UpdateAvatar() {
  let user = JSON.parse(localStorage.getItem("user"))
  let [avatar, setAvatar] = useState(false)
  const props = {
    name: 'file',
    action: 'http://localhost:3001/module/uploadfile',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        
      }
      if (info.file.status === 'done') {
        axios({
          method: "PUT",
          url: `/user/avatar/${user._id}`,
          data: {
            urlAvatar: info.file.response
          }
        })
        .then((res)=>{
          user.avatar = info.file.response;
          localStorage.setItem("user", JSON.stringify(user))
          alert(res.data.message)
          setAvatar(!avatar)
        }).catch((err)=>{
          alert(err.response.data.message)
        })
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

    return (
        <BaseLayout> 
          <Row>
              <Col span={24}>
                <div style={{width:'100%', height: '272px', textAlign: 'center', paddingTop:'50px'}}>
                  <Avatar src={user.avatar} size={124}   />
                  <Upload {...props}>
                    <CameraFilled  className='camera' style={{ fontSize: '17px', color: 'white', paddingTop: '4px' , marginLeft: '-1px'}} />
                  </Upload>
                  <h2> {user.username} </h2>
                </div>
                </Col>
          </Row>
        </BaseLayout>

    );
}

export default UpdateAvatar;