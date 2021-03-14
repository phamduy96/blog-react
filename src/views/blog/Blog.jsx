import React, { useEffect, useState } from 'react';
import { Image } from 'antd';
import {
    GlobalOutlined, VideoCameraOutlined, QuestionCircleOutlined,
    StrikethroughOutlined, CustomerServiceOutlined, CaretRightOutlined
} from '@ant-design/icons';
import axios from "../../config/axios/axios"
import BaseLayout from "../../components/BaseLayout/BaseLayout"
import "./Blog.css"
import { useHistory } from 'react-router-dom';
function Blog(props) {
    let history = useHistory()
    let [overView, setOverView] = useState(false)
    let [dataBlog, setDataBlog] = useState("")
    let [showSiderBar, setShowSiderBar] = useState("")
    useEffect(() => {
        axios({
            method: "GET",
            url: "/blog"
        })
            .then((res) => {
                setDataBlog(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [overView])

    const listBlog = dataBlog.slice(1, dataBlog.length)
    return (
        <BaseLayout>
            <div className="blog-content">
                <div style={showSiderBar ? showSiderBar : {}} className="blog-siderbar">
                    <ul>
                        <li><GlobalOutlined style={{ fontSize: "22px", color: "blue", marginRight: "10px" }}></GlobalOutlined> Thời sự</li>
                        <li><GlobalOutlined style={{ fontSize: "22px", color: "blue", marginRight: "10px" }}></GlobalOutlined> Thế giới</li>
                        <li><GlobalOutlined style={{ fontSize: "22px", color: "blue", marginRight: "10px" }}></GlobalOutlined> Góc nhìn</li>
                        <li><GlobalOutlined style={{ fontSize: "22px", color: "blue", marginRight: "10px" }}></GlobalOutlined> Thể thao</li>
                        <li><StrikethroughOutlined style={{ fontSize: "22px", color: "#c2d46c", marginRight: "10px" }}></StrikethroughOutlined> Kinh doanh</li>
                        <li><VideoCameraOutlined style={{ fontSize: "22px", color: "red", marginRight: "10px" }}></VideoCameraOutlined> Video</li>
                        <li><GlobalOutlined style={{ fontSize: "22px", color: "blue", marginRight: "10px" }}></GlobalOutlined> Pháp luật</li>
                        <li><QuestionCircleOutlined style={{ fontSize: "22px", color: "green", marginRight: "10px" }}></QuestionCircleOutlined> Giáo dục</li>
                        <li><CustomerServiceOutlined style={{ fontSize: "22px", color: "#39e6e6", marginRight: "10px" }}></CustomerServiceOutlined> Giải trí</li>
                        <li><GlobalOutlined style={{ fontSize: "22px", color: "blue", marginRight: "10px" }}></GlobalOutlined> Sức khỏe</li>
                        <li><GlobalOutlined style={{ fontSize: "22px", color: "blue", marginRight: "10px" }}></GlobalOutlined> Đời sống</li>
                        <li><GlobalOutlined style={{ fontSize: "22px", color: "blue", marginRight: "10px" }}></GlobalOutlined> Du lịch</li>
                        <li><GlobalOutlined style={{ fontSize: "22px", color: "blue", marginRight: "10px" }}></GlobalOutlined> Khoa học</li>
                        <li><GlobalOutlined style={{ fontSize: "22px", color: "blue", marginRight: "10px" }}></GlobalOutlined> Số hóa</li>
                        <li><GlobalOutlined style={{ fontSize: "22px", color: "blue", marginRight: "10px" }}></GlobalOutlined> Tâm sự</li>
                        <li><GlobalOutlined style={{ fontSize: "22px", color: "blue", marginRight: "10px" }}></GlobalOutlined> Diễn đàn</li>
                    </ul>
                </div>
                <div className="blog-lists"  onClick={()=>{
                        showSiderBar ? setShowSiderBar(false) : setOverView(false);
                    }}>
                    <CaretRightOutlined className="blog-menusiderbar" onClick={()=>{
                        setShowSiderBar({
                            transform: "translateX(0)",
                            zIndex: "10"
                        })
                    }}></CaretRightOutlined>
                    {dataBlog.length ? <div className="blog-prominences">
                                    <span className="tooltiptext">Click here</span>
                                    <Image className="blog-prominences-image"
                                        src= {dataBlog.length ? dataBlog[0].image : null}
                                    >
                                    </Image>
                                    <div className="blog-prominences-title">
                                        <h4 onClick={()=>{
                                            history.push(`/detailBlog/${dataBlog[0]._id}`)
                                        }}>{dataBlog.length ? dataBlog[0].title : null}</h4>
                                        <p>{dataBlog.length ? dataBlog[0].content: null}</p>
                                    </div>
                                </div> : null
                    }

                    {
                        dataBlog.length ? listBlog.map((item, index) => {
                            return (
                                <div className="lists-blog" key={index}>
                                        <h4 onClick={()=>{
                                            history.push(`/detailBlog/${item._id}`)
                                        }}>{item.title}</h4>
                                        <div className="blog-child">
                                            <Image className="blog-child-image"
                                                src= {item.image}
                                            >
                                            </Image>
                                            <div className="blog-child-title">
                                                <p>{item.content}</p>
                                            </div>
                                        </div>
                                    </div>
                            )
                        }) : null
                    }
                </div>
            </div>
        </BaseLayout>

    );
}

export default Blog;