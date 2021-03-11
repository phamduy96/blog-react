import React, { useEffect, useState } from 'react';
import BaseLayout from "../../components/BaseLayout/BaseLayout";
import axios from "../../config/axios/axios"
import "../blog/DetailBlog.css"
import { Col, Row, Image, Input, BackTop, Affix, Avatar } from 'antd';
import {
    createFromIconfontCN, LeftCircleOutlined, ArrowUpOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import { set } from 'js-cookie';

function DetailBlog(props) {
    let [dataBlog, setDataBlog] = useState("")
    let idBlog = window.location.href.split('http://localhost:3000/detailBlog/')[1];
    let [contentComment, setContentComment] = useState("")
    let history = useHistory()
    let user = JSON.parse(localStorage.getItem('user'));
    let [comments, setComments] = useState("")
    let [overview, setOverview] = useState(false)
    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
    });
    useEffect(() => {
        axios({
            method: 'GET',
            url: `/detail-blog/${idBlog}`
        }).then((data) => {
            setDataBlog(data.data.data);
        }).catch((err) => {
            console.log(err)
        })
    }, [overview])

    useEffect(() => {
        if(dataBlog){
            axios({
                method: "GET",
                url: `/blog/getComment/${dataBlog._id}`
            })
            .then((res) => {
                setComments(res.data.data[0].idComment)
            })
            .catch((err) => {
                console.dir(err)
            })
        }
    }, [dataBlog])

    console.log(comments)
    return (
        <BaseLayout>
            <div style={{ paddingBottom: "20px" }}>
                <Row>
                    <Col >
                        <Affix offsetTop={280} onChange={affixed => console.log(affixed)}>
                            <div className="icon-fix">
                                <div>  <LeftCircleOutlined onClick={() => {
                                    history.push("/blog")
                                }} />  </div>
                                <div> <IconFont type="icon-facebook" /> </div>
                                <div> <IconFont type="icon-twitter" /> </div>
                            </div>

                        </Affix >
                        {<div style={{ background: "#fcfaf6" }}>
                            <div className="container" style={{ padding: "0 25px", marginBottom: "40px" }}>
                                <h1 style={{ paddingBottom: "20px", marginBottom: "30px", fontSize: "25px" }}> {dataBlog.title}  </h1>
                                <div style={{ textAlign: "center", paddingBottom: "20px" }}>
                                    <Image style={{ width: "500px", height: '300px' }}
                                        src={dataBlog.image}
                                    >
                                    </Image>
                                    <p style={{textAlign: "center", marginTop: "15px"}}>{dataBlog.introduceImg}</p>

                                </div>
                                <h3> {dataBlog.content}   </h3>
                            </div>
                        </div>
                        }
                        < hr style={{ height: "3px" }} />
                        <div style={{ paddingBottom: "30px" }}>
                            <div className="container">
                                <h3 style={{ fontSize: "20px", paddingBottom: "20px" }}> Comments </h3>
                                <Input placeholder="Y kien cua ban " type="text" onChange={(e) => {
                                    setContentComment(e.target.value)
                                }} />
                                <button type="button" style={{ marginTop: "10px", marginBottom: "20px", padding: "3px", cursor: "pointer" }} onClick={() => {
                                    axios({
                                        method: "POST",
                                        url: "/comment",
                                        data: {
                                            idBlog: dataBlog._id,
                                            idUser: user._id,
                                            content: contentComment
                                        }
                                    })
                                        .then((res) => {
                                            setOverview(!overview)
                                        })
                                        .catch((err) => {
                                            console.dir(err);
                                        })
                                }}> gui binh luan </button>
                                <div>
                                    
                                    { comments.length ? comments.map((item, index)=>{
                                        return <Row style={{ marginTop: "10px" }} key={index}>
                                        <Col span={1}>
                                            <div className="avatar">
                                                { item.idUser ? item.idUser.avatar.length === 1 ? <Avatar style={{color: "rgb(230, 70, 78)"}}>{item.idUser.avatar.toUpperCase()}</Avatar> : <Avatar src={`${item.idUser.avatar}`}></Avatar> : null}
                                            </div>
                                        </Col>
                                        <Col span={23} style={{ paddingLeft: "10px" }}>
                                            <span style={{ color: "#9670d4", fontWeight: "600", paddingRight: "10px", fontSize: "18px" }}> {item.idUser ? item.idUser.username : null} </span>
                                            <span style={{fontSize: "17px" }}> {item.idUser ? item.content : null} </span>
                                        </Col>
                                    </Row> }) : null
                                    }
                                </div>
                            </div>

                        </div>

                        <BackTop>
                            <ArrowUpOutlined className="backTop" />
                        </BackTop>
                    </Col>

                </Row>
            </div>
        </BaseLayout>
    );
}

export default DetailBlog;

