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
    let time = Date.now();
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
    const dateComment = new Date("2021-03-11 02:00:00");
    const date = new Date();
    const a = new Date(date.getTime() - dateComment.getTime());
    
    console.log(a)
    function getTimeComment(timeCreateAt) {
        let years = Math.floor((Date.now() - timeCreateAt)/(259200 * 3600000));
        let months = Math.floor((Date.now() - timeCreateAt - years * (259200 * 3600000))/(720 * 3600000));
        let weeks = Math.floor((Date.now() - timeCreateAt - years * (259200 * 3600000) - months * (720 * 3600000))/(168 * 3600000));
        let days = Math.floor((Date.now() - timeCreateAt - years * (259200 * 3600000) - months * (720 * 3600000) - weeks * (168 * 3600000))/(24 * 3600000));
        let hours = Math.floor((Date.now() - timeCreateAt - years * (259200 * 3600000) - months * (720 * 3600000) - weeks * (168 * 3600000) - days * (24 * 3600000))/(3600000));
        let minutes = Math.floor((Date.now() - timeCreateAt - years * (259200 * 3600000) - months * (720 * 3600000) - weeks * (168 * 3600000) - days * (24 * 3600000) - hours * 3600000)/(60000));
        let seconds = Math.floor((Date.now() - timeCreateAt - years * (259200 * 3600000) - months * (720 * 3600000) - weeks * (168 * 3600000) - days * (24 * 3600000) - hours * 3600000 - minutes * 60000)/(1000));
        return { years, months, days, weeks, hours, minutes, seconds}
    }
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
                                            content: contentComment,
                                            createAt: Date.now() - 1000
                                        }
                                    })
                                        .then((res) => {
                                            setOverview(!overview)
                                        })
                                        .catch((err) => {
                                            alert(err.response.data.message)
                                        })
                                }}> gui binh luan </button>
                                <div>
                                    
                                    { comments.length ? comments.map((item, index)=>{
                                        let timeAgo = getTimeComment(item.createAt)
                                        return <Row style={{ marginTop: "10px" }} key={index}>
                                        <Col span={1}>
                                            <div className="avatar">
                                                { item.idUser ? item.idUser.avatar.length === 1 ? <Avatar style={{color: "rgb(230, 70, 78)"}}>{item.idUser.avatar.toUpperCase()}</Avatar> : <Avatar src={`${item.idUser.avatar}`}></Avatar> : null}
                                            </div>
                                        </Col>
                                        <Col span={23} style={{ paddingLeft: "10px" }}>
                                            <span style={{ color: "#9670d4", fontWeight: "600", paddingRight: "10px", fontSize: "18px" }}> {item.idUser ? item.idUser.username : null} </span>
                                            <span style={{fontSize: "14px", color: "#424447" }}>{timeAgo.years ? timeAgo.years : null}
                                                {timeAgo.years ? <span style={{marginRight: "7px", marginLeft: "5px"}}>years</span> : null}
                                                {timeAgo.months ? timeAgo.months : null}
                                                {timeAgo.months ? <span style={{marginRight: "7px", marginLeft: "5px"}}>months</span> : null}
                                                {timeAgo.weeks ? timeAgo.weeks : null}
                                                {timeAgo.weeks ? <span style={{marginRight: "7px", marginLeft: "5px"}}>weeks</span> : null}
                                                {timeAgo.days ? timeAgo.days : null}
                                                {timeAgo.days ? <span style={{marginRight: "7px", marginLeft: "5px"}}>days</span> : null}
                                                {timeAgo.hours ? timeAgo.hours : null}
                                                {timeAgo.hours ? <span style={{marginRight: "7px", marginLeft: "5px"}}>hours</span> : null}
                                                {timeAgo.minutes ? timeAgo.minutes : null}
                                                {timeAgo.minutes ? <span style={{marginRight: "7px", marginLeft: "5px"}}>minutes</span> : null}
                                                {timeAgo.seconds ? timeAgo.seconds : null}
                                                {timeAgo.seconds ? <span style={{marginRight: "7px", marginLeft: "5px"}}>seconds</span> : null}
                                                <span>ago</span>
                                            </span>
                                            <span className="detailBlog-commentContent" style={{fontSize: "16px" }}> {item.idUser ? item.content : null} </span> 
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

