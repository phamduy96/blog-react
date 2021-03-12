import React, { useState } from 'react';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

function UpdateAvatar() {
  let user = JSON.parse(localStorage.getItem("user"))
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
        <>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </>

    );
}

export default UpdateAvatar;