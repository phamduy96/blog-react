import React, { useState } from 'react';
import axios from "../../config/axios/axios";
import "./UpdatePhone.css"
import { useHistory} from "react-router-dom"

function UpdatePhone(props) {
    let history = useHistory()
    let user = JSON.parse(localStorage.getItem('user'));
    let [phoneNumber, setPhoneNumber] = useState("");
    let [styleInput, setStyleInput] = useState("");
    let [styleButton, setStyleButton] = useState("")
    let [styleDiv, setStyleDiv] = useState("")
    
    return (
        <div className="update-phone">
            <p >Bạn có muốn cập nhật số điện thoại</p>
            <div style={styleDiv ? styleDiv : {}}>
                <span onClick={()=>{
                    setStyleDiv({
                        display: "none"
                    })
                    setStyleInput({
                        display: "inline-block"
                    })
                    setStyleButton({
                        display: "inline-block"
                    })
                }}>có</span>
                <span onClick={()=>{
                    history.push("/blog")
                }}>không</span>
            </div>
            <input style={styleInput ? styleInput : {}} type="text" placeholder="Input your phone number" onChange={(e)=>{
                setPhoneNumber(e.target.value)
            }}/>
            <p></p>
            <button style={styleButton ? styleButton : {}} onClick={()=>{
                axios({
                    method: "PUT",
                    url: `/user/phone/${user._id}`,
                    data: {
                        phone: phoneNumber
                    }
                })
                .then((res)=>{
                    history.push("/blog")
                })
                .catch((err)=>{
                    alert(err.response.data.message)
                })
            }}>Cập nhật</button>
        </div>
    );
}

export default UpdatePhone;