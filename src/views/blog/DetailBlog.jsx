import React, { useEffect, useState } from 'react';
import BaseLayout from "../../components/BaseLayout/BaseLayout1";
import axios from "../../config/axios/axios"
import "../blog/DetailBlog.css"
import { Col, Row, Image, Input, BackTop, Affix, Avatar , Button} from 'antd';
import {
    createFromIconfontCN, LeftCircleOutlined, ArrowUpOutlined
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

    if(comments){
        comments = comments.filter((item)=>{
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
                    <Col md={18}>
                        {<div>
                            <div  style={{ padding: "0 25px", marginBottom: "70px" }}>
                                <h1 style={{ paddingBottom: "20px", marginBottom: "30px", fontSize: "25px" }}> {dataBlog.title}  </h1>
                                <div style={{ textAlign: "center", paddingBottom: "20px" }}>
                                    <Image style={{ width: "100%", height: '400px' }}
                                        src={dataBlog.image}
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
                                    <Input placeholder="Y kien cua ban... " type="text" onChange={(e) => {
                                        setContentComment(e.target.value)
                                    }} />
                                </div>
                                <Button style={{marginBottom: '10px'}} type="primary" onClick={() => {
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
                                }}> Gửi bình luận </Button>
                                <div>

                                    {comments.length ? comments.map((item, index) => {
                                        let timeAgo = getTimeComment(item.createAt)
                                        return <Row style={{ marginTop: "10px" }} key={index}>
                                            <Col span={1}>
                                                <div className="avatar">
                                                    {item.idUser ? item.idUser.avatar.length === 1 ? <Avatar style={{ color: "rgb(230, 70, 78)" }}>{item.idUser.avatar.toUpperCase()}</Avatar> : <Avatar src={`${item.idUser.avatar}`}></Avatar> : null}
                                                </div>
                                            </Col>
                                            <Col span={23} style={{ paddingLeft: "30px" }}>
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
                    <Col span={6}>
                        <iframe style={{width: '100%',height:'600px', marginBottom:'20px', border: 'none'}} src="https://ds.polyad.net/ads/h/havenpark/2021/03/11/50635/300x600/dfp/pc/std/fixed/?link=https%3A%2F%2Fadclick.g.doubleclick.net%2Fpcs%2Fclick%3Fxai%3DAKAOjsvsTiaJPkBzDpZXAhbHMGAk2cfUupf7I5haxGGpJd9xIL0i7g8V-DFoHmhSHo52vK_vD5t92t1HH_hBx0xvfGzRRTWalvey212MuS_tVQwU8mC1xMj3qHaMIpPiONuZFEpQyb62Yg5y0xZH51jhE7kTadjetcGgfVJTlVftf-Fut9lXsr7zMbhbUwA0bUTBVBcuA-Hgwa6mucD6O1iIeB4Fw1bWMSZDBc9_zL_AH-sZqWJ3L7u3Tl4Q9aAXc4sVHJIU7GF6NQwz5eHJ5eKWjsLsMXQQ4KA-a1Uwf-ZjoW0_m1AI8quDLj6pcS9OEkTaVFKbZWXVbxYAG9jUcSs%26sai%3DAMfl-YTkW8b_BBv-yllLQ8NBCRpzKoNRDtVZNNyrnpMjXZsQLSK6IJUMe-XPjKlBouwC-EhAFuXHOSYkbIzbRWIsS2Wc4UL-H_2pyHlUSUEJgcvKhWRcqG9UpX42r4Fv6M8cykeU%26sig%3DCg0ArKJSzLpJOQP-9zBWEAE%26urlfix%3D1%26adurl%3Dhttps%253A%252F%252Fhavenpark.ecopark.com.vn%252F%253Futm_source%253DVNE%2526utm_medium%253Dlarge&otherlink=&campaign_name=HavenPark%20&index_brand=LB1001.8_Ecopark%20&index_industrial=L1001_B%E1%BA%A5t%20%C4%91%E1%BB%99ng%20s%E1%BA%A3n" alt=""/>
                        <h3 style={{fontSize: '20px' ,fontWeight: 'bolder', color:'#f69631', }}> TIN THẾ GIỚI </h3>
                        <div>
                            <Image src='https://i1-vnexpress.vnecdn.net/2021/03/14/lloyd-austin-5-3549-1615710645.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=L198TOHoewn8imzQkvwASA'/>
                            <div style={{width:'100%',height:'350px',overflowY: 'scroll', paddingBottom: '8px'}}>
                                <div className='text-title' style={{paddingTop:'5px'}}>
                                    <h3>Mỹ muốn cùng đồng minh châu Á răn đe Trung Quốc</h3>
                                    <p>Bộ trưởng Quốc phòng Mỹ đề cao hợp tác quân sự với các đồng minh châu Á nhằm duy trì lợi thế, xây dựng khả năng răn đe Trung Quốc. </p>
                                    <hr/>
                                </div>
                                <div  className='text-title' style={{paddingTop:'5px'}}>
                                    <h3>Mỹ muốn cùng đồng minh châu Á răn đe Trung Quốc</h3>
                                    <p>Bộ trưởng Quốc phòng Mỹ đề cao hợp tác quân sự với các đồng minh châu Á nhằm duy trì lợi thế, xây dựng khả năng răn đe Trung Quốc. </p>
                                    <hr/>
                                </div>
                                <div  className='text-title' style={{paddingTop:'5px'}}>
                                    <h3>Mỹ muốn cùng đồng minh châu Á răn đe Trung Quốc</h3>
                                    <p>Bộ trưởng Quốc phòng Mỹ đề cao hợp tác quân sự với các đồng minh châu Á nhằm duy trì lợi thế, xây dựng khả năng răn đe Trung Quốc. </p>
                                    <hr/>
                                </div>
                            </div>
                        </div>
                    </Col>

                </Row>
            </div>
        </BaseLayout>
    );
}

export default DetailBlog;

