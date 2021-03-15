import React, { useState, } from 'react';
import axios from "../../config/axios/axios"
import "./UpdateBlog.css"
function UpdateBlog(props) {
    let [srcImg, setSrcImg] = useState("");
    let [imagedetail, setImagedetail] = useState("")
    let [introduceImg, setIntroduceImg] = useState("");
    let [title, setTitle] = useState("");
    let [content, setContent] = useState("");
    let [category, setCategory] = useState("")
    return (
        <div>
            <form className="updateBlog-form">
                <h3>Nhập thông tin blog cần thêm</h3>
                <label style={{marginRight: "10px"}} for="catagory">Chọn thể loại</label>
                <select id="catagory" onChange={(e)=>{
                    setCategory(e.target.value)
                }}> Thể loại
                    <option value="news">Thời sự</option>
                    <option value="world">Thế giới</option>
                    <option value="life">Đời sống</option>
                    <option value="heath">Sức khỏe</option>
                    <option value="education">Giáo dục</option>
                    <option value="fulball">Bóng đá</option>
                    <option value="technology">Khoa học</option>
                </select>
                <input placeholder="Nhập src image blog" type="text" onChange={(e) => {
                    setSrcImg(e.target.value)
                }} />
                <input placeholder="Nhập src imagedetail blog" type="text" onChange={(e) => {
                    setImagedetail(e.target.value)
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
                if(title === "" || introduceImg === "" || content === "" || srcImg === "" || imagedetail === "" || category === ""){
                    alert("Chưa nhập đầy đủ thông tin")
                }else{
                    axios({
                        method: "POST",
                        url: "/blog",
                        data: {
                            title: title,
                            introduceImg: introduceImg,
                            content: content,
                            image: srcImg,
                            imagedetail: imagedetail,
                            category: category
                        }
                    })
                        .then((res) => {
                            alert(res.data.message)
                        })
                        .catch((err) => {
                            alert(err)
                        })
                }
                }}>Thêm blog
            </button>
            <p> l</p>
        </div>
    );
}

export default UpdateBlog;