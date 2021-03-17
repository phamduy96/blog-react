import React, {useState} from 'react';
import axios from "../../config/axios/axios"
import "./LoginAdmin.css";
import { useHistory} from "react-router-dom"
function LoginAdmin(props) {
    let history = useHistory()
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    return (
        <div className="loginAdmin">
            <input type="text" placeholder="Nhập Email" onChange={(e)=>{
                setEmail(e.target.value)
            }}/>
            <input type="text" placeholder="Nhập password" onChange={(e)=>{
                setPassword(e.target.value)
            }}/>
            <button style={{fontSize: "20px"}} onClick={()=>{
                axios({
                    method: "POST",
                    url: "/user/login",
                    data: {
                        email: email,
                        password: password
                    }
                })
                .then( async (res)=>{
                    if(res.data.user.role = "admin"){
                        localStorage.setItem("user", JSON.stringify(res.data.user))
                        history.push("/user")
                        
                    }else{
                        alert("Bạn khong phai la admin")
                    }
                    
                })
                .catch((err)=>{
                    alert(err.response.data.message)
                })
            }}>Đăng Nhập</button>
        </div>
    );
}

export default LoginAdmin;