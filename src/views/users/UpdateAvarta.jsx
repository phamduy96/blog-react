import React, { useState } from 'react';
import axios from "../../config/axios/axios";
import "./UpdateAvarta.css"
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

function UpdateAvarta(props) {
  let history = useHistory()
  let user = JSON.parse(localStorage.getItem('user'));
  let [urlAvatar, setUrlAvatar] = useState("")
  const prop = {
    name: 'file',
    action: '/module/profile',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        console.log(info.file)

      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="update-avarta">
      <p>Vui lòng cập nhật Avarta của bạn </p>
      <input className="update-avarta-input" type="text" placeholder="Nhập URL Avatar" onChange={(e)=>{
        setUrlAvatar(e.target.value)
      }}/>
      <Upload {...prop}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <button className="update-avarta-btn" onClick={() => {
        axios({
          method: "PUT",
          url: `/user/avatar/${user._id}`,
          data: {
            urlAvatar: urlAvatar ? urlAvatar : user.username.slice(0, 1).toUpperCase()
          }
        })
          .then((res) => {
            user.avatar = urlAvatar;
            localStorage.setItem("user", JSON.stringify(user))
            alert(res.data.message)
            history.push("blog")
          })
          .catch((err) => {
            alert(err.response.data.message)
          })
      }}>Cập nhật</button>
    </div>
  );
}

export default UpdateAvarta;