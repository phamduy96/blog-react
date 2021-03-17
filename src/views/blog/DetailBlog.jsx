import React, { useEffect, useState } from 'react';
import BaseLayout from "../../components/BaseLayout/BaseLayout1";
import axios from "../../config/axios/axios"
import "../blog/DetailBlog.css"
import { Col, Row, Image, Input, Affix, Avatar , Button} from 'antd';
import {
    createFromIconfontCN, LeftCircleOutlined
} from '@ant-design/icons';

import { useHistory } from 'react-router-dom';


function DetailBlog(props) {
    let [dataBlog, setDataBlog] = useState("")
    let idBlog = window.location.href.split('http://localhost:3000/detailBlog/')[1];
    let [contentComment, setContentComment] = useState("")
    let history = useHistory()
    let user = JSON.parse(localStorage.getItem('user'));
    let [comments, setComments] = useState("")
    let [overview, setOverview] = useState(false)
    let [worldBlog, setWorldBlog] = useState("")
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
        const contentCommnet = document.getElementById("commentID");
        console.log(contentCommnet);
    }, [contentComment])

    function getTimeComment(timeCreateAt) {
        let years = Math.floor((Date.now() - timeCreateAt) / (259200 * 3600000));
        let months = Math.floor((Date.now() - timeCreateAt - years * (259200 * 3600000)) / (720 * 3600000));
        let weeks = Math.floor((Date.now() - timeCreateAt - years * (259200 * 3600000) - months * (720 * 3600000)) / (168 * 3600000));
        let days = Math.floor((Date.now() - timeCreateAt - years * (259200 * 3600000) - months * (720 * 3600000) - weeks * (168 * 3600000)) / (24 * 3600000));
        let hours = Math.floor((Date.now() - timeCreateAt - years * (259200 * 3600000) - months * (720 * 3600000) - weeks * (168 * 3600000) - days * (24 * 3600000)) / (3600000));
        let minutes = Math.floor((Date.now() - timeCreateAt - years * (259200 * 3600000) - months * (720 * 3600000) - weeks * (168 * 3600000) - days * (24 * 3600000) - hours * 3600000) / (60000));
        let seconds = Math.floor((Date.now() - timeCreateAt - years * (259200 * 3600000) - months * (720 * 3600000) - weeks * (168 * 3600000) - days * (24 * 3600000) - hours * 3600000 - minutes * 60000) / (1000));
        return { years, months, days, weeks, hours, minutes, seconds }
    }
    useEffect(() => {
        if (dataBlog) {
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
    useEffect(() => {
        axios({
            method: "GET",
            url: `/blog/world`
        })
            .then((res) => {
                setWorldBlog(res.data.data)
            })
            .catch((err) => {
                alert(err.response.data.message)
            })
    }, [])
    function shuffle(array) {
        var currentIndex = array.length;
        while (0 !== currentIndex) {

            // Pick a remaining element...
            let randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            let temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
    var WorldBlosShuffle = null;
    if (worldBlog) {
        WorldBlosShuffle = shuffle(worldBlog)
    }
    if (comments) {
        comments = comments.filter((item) => {
            return item.idUser
        })
    }

    return (
        <BaseLayout>
          <Affix offsetTop={240} onChange={affixed => console.log(affixed)}>
                    <div className="icon-fix">
                        <div>  <LeftCircleOutlined onClick={() => {
                            history.push("/blog")
                        }} />  
                        </div>
                        <div> <IconFont type="icon-facebook" /> </div>
                        <div> <IconFont type="icon-twitter" /> </div>
                    </div>

            </Affix >
            <div className='container' style={{ paddingBottom: "20px" }}>
              
                <Row>
                    <Col md={18} xs={24}>
                        {<div>
                            <div  style={{ padding: "0 25px", marginBottom: "70px" }}>
                                <h1 style={{ paddingBottom: "20px", marginBottom: "30px", fontSize: "25px" }}> {dataBlog.title}  </h1>
                                <div style={{ textAlign: "center", paddingBottom: "20px" }}>
                                    <Image style={{ width: "100%" }}
                                        src={dataBlog.imagedetail}
                                    >
                                    </Image>
                                    <p style={{ textAlign: "center", marginTop: "15px" }}>{dataBlog.introduceImg}</p>

                                </div>
                                <p style={{fontSize: '18px', fontWeight: '400'}}> {dataBlog.content}   </p>
                            </div>
                        </div>
                        }
                        < hr style={{ height: "3px" }} />
                        <div style={{ paddingBottom: "30px" }}>
                            <div>
                                <h3 style={{fontSize: '20px' ,fontWeight: 'bolder', color:'#f69631', }}> {comments.length} COMMENTS </h3>
                                <div className="comment-detailblog">
                                    {user.avatar ? user.avatar.length === 1 ? <Avatar>{user.avatar.toUpperCase()}</Avatar> : <Avatar src={user.avatar}></Avatar> : null}
                                    <Input onChange={(e)=>{setContentComment(e.target.value)}} placeholder="Y kien cua ban... " type="text"/>
                                </div>
                                <Button style={{marginBottom: '10px'}} type="primary" onClick={() => {
                                    contentComment ? axios({
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
                                        }) : setContentComment("")
                                }}> Gửi bình luận </Button>
                                <div>

                                    {comments.length ? comments.map((item, index) => {
                                        let timeAgo = getTimeComment(item.createAt)
                                        return <Row style={{ marginTop: "10px" }} key={index}>
                                            <Col xs={3} sm={2}>
                                                <div className="avatar">
                                                    {item.idUser ? item.idUser.avatar.length === 1 ? <Avatar style={{ color: "rgb(230, 70, 78)" }}>{item.idUser.avatar.toUpperCase()}</Avatar> : <Avatar src={`${item.idUser.avatar}`}></Avatar> : null}
                                                </div>
                                            </Col>
                                            <Col xs={21} sm={22} style={{ paddingLeft: "10px" }}>
                                                <span style={{ color: "#9670d4", fontWeight: "600", paddingRight: "10px", fontSize: "18px" }}> {item.idUser ? item.idUser.username : null} </span>
                                                <span style={{ fontSize: "14px", color: "#424447" }}>{timeAgo.years ? timeAgo.years : null}
                                                    {timeAgo.years ? <span style={{ marginRight: "7px", marginLeft: "5px" }}>years</span> : null}
                                                    {timeAgo.months ? timeAgo.months : null}
                                                    {timeAgo.months ? <span style={{ marginRight: "7px", marginLeft: "5px" }}>months</span> : null}
                                                    {timeAgo.weeks ? timeAgo.weeks : null}
                                                    {timeAgo.weeks ? <span style={{ marginRight: "7px", marginLeft: "5px" }}>weeks</span> : null}
                                                    {timeAgo.days ? timeAgo.days : null}
                                                    {timeAgo.days ? <span style={{ marginRight: "7px", marginLeft: "5px" }}>days</span> : null}
                                                    {timeAgo.hours ? timeAgo.hours : null}
                                                    {timeAgo.hours ? <span style={{ marginRight: "7px", marginLeft: "5px" }}>hours</span> : null}
                                                    {timeAgo.minutes ? timeAgo.minutes : null}
                                                    {timeAgo.minutes ? <span style={{ marginRight: "7px", marginLeft: "5px" }}>minutes</span> : null}
                                                    {timeAgo.seconds ? timeAgo.seconds : null}
                                                    {timeAgo.seconds ? <span style={{ marginRight: "7px", marginLeft: "5px" }}>seconds</span> : null}
                                                    <span>ago</span>
                                                </span>
                                                <span className="detailBlog-commentContent" style={{ fontSize: "16px" }}> {item.idUser ? item.content : null} </span>
                                            </Col>
                                        </Row>
                                    }) : null
                                    }
                                </div>
                            </div>

                        </div>
                    </Col>
                    <Col md={6} xs={24}>
                        <img className='banner' style={{ width: '100%', paddingTop: '10px', marginBottom: '50px' }} src="https://news.mogi.vn/wp-content/uploads/2020/09/bannerbatdongsan041.jpg" alt="" />
                        <h3 style={{ fontSize: '20px', fontWeight: 'bolder', color: '#f69631', }}> TIN THẾ GIỚI </h3>
                        {worldBlog.length ? <div>
                            <Image style={{ width: "100%" }} src={WorldBlosShuffle[0].image} />
                            <div style={{ width: '100%', height: '350px', overflowY: 'scroll', paddingBottom: '8px' }}>
                                {WorldBlosShuffle.map((item, index) => {
                                    return <div key={index} className='text-title' style={{ paddingTop: '5px' }}>
                                        <h3 onClick={() => {
                                            setOverview(!overview)
                                            history.push(`/detailBlog/${item._id}`)
                                        }}>{item.title}</h3>
                                        <p>{item.content.slice(0, 150)} </p>
                                        <hr />
                                    </div>

                                })}
                            </div>
                        </div> : null}
                    </Col>

                </Row>
            </div>
        </BaseLayout>
    );
}

export default DetailBlog;

