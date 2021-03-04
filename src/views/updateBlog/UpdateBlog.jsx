import React, { useState, } from 'react';
import axios from "../../config/axios/axios"
import "./UpdateBlog.css"
function UpdateBlog(props) {
    let [srcImg, setSrcImg] = useState("");
    let [introduceImg, setIntroduceImg] = useState("");
    let [title, setTitle] = useState("");
    let [content, setContent] = useState("");

    return (
        <div>
            <form className="updateBlog-form">
                <input placeholder="Nhập src image blog" type="text" onChange={(e) => {
                    setSrcImg(e.target.value)
                }} />
                <input placeholder="Nhập introduce image" type="text" onChange={(e) => {
                    setIntroduceImg(e.target.value)
                }} />
                <input placeholder="Nhập title blog" type="text" onChange={(e) => {
                    setTitle(e.target.value)
                }} />
                <textarea className="updateBlog-content"  placeholder="updateBlog-content" onChange={(e) => {
                    setContent(e.target.value)
                }}></textarea>
            </form>
            <button className="updateBlog-button" type="submit" onClick={() => {
                axios({
                    method: "POST",
                    url: "/blog",
                    data: {
                        title: title,
                        introduceImg: introduceImg,
                        content: content,
                        image: srcImg
                    }
                })
                    .then((res) => {
                        alert(res.data.message)
                    })
                    .catch((err) => {
                        alert(err)
                    })
                }}>Thêm blog</button>
        </div>
    );
}

export default UpdateBlog;