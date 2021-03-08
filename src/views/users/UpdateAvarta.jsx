import React, { useState } from 'react';
import axios from "../../config/axios/axios";
import "./UpdateAvarta.css"
import { Avatar} from 'antd';
import { useHistory } from 'react-router-dom';
function UpdateAvarta(props) {
    let history = useHistory()
    let user = JSON.parse(localStorage.getItem('user'));
    let [urlAvatar, setUrlAvatar] = useState("")
    return (
        <div className="update-avarta">
            <p>Vui lòng cập nhật URL Avarta của bạn </p>
            <input type="text" placeholder="Input your URL Avatar" onChange={(e)=>{
                setUrlAvatar(e.target.value)
            }}/>
            <p>hoặc chọn</p>
            <Avatar className="avarta-user" onClick={()=>{
                alert(`Đã chọn ảnh Avatar, click Cập nhật để update`)
            }}>{user.username.slice(0,1).toUpperCase()}</Avatar>
            <p>là ảnh Avarta của bạn</p>
            <button onClick={()=>{
                axios({
                    method: "PUT",
                    url: `/user/avatar/${user._id}`,
                    data: {
                        urlAvatar: urlAvatar ? urlAvatar : user.username.slice(0,1).toUpperCase()
                    }
                })
                .then((res)=>{
                    alert(res.data.message)
                    if(res.data.phone){
                        history.push("/blog")
                    }else{
                        history.push("/updatePhone")
                    }
                })
                .catch((err)=>{
                    alert(err.response.data.message)
                })
            }}>Cập nhật</button>
        </div>
    );
}

export default UpdateAvarta;