import React, { useEffect, useState } from 'react';

import { Col, Row, Image, Button } from 'antd';
import "./Blog.css"
import axios from "../../config/axios/axios"
import { useHistory } from 'react-router-dom';
import BaseLayout1 from "../../components/BaseLayout/BaseLayout1";
function Blog() {
    let history = useHistory()
    let [overView, setOverView] = useState(false)
    let [dataBlog, setDataBlog] = useState("")
    let [worldBlog, setWorldBlog] = useState("")
    useEffect(() => {
        axios({
            method: "GET",
            url: `/blog/news`
        })
            .then((res) => {
                setDataBlog(res.data.data)
            })
            .catch((err) => {
                alert(err.response.data.message)
            })
    }, [overView])
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
    
    function hotNews() {
        let ContentHotNews = []
        if (dataBlog.length <= 5 && dataBlog.length >= 1) {
            for (var i = dataBlog.length - 1; i >= 0; i--) {
                let id = dataBlog[i]._id
                ContentHotNews.push(<p onClick={() => {
                    history.push(`/detailBlog/${id}`)
                }} > <span style={{ fontSize: '18px', fontWeight: 'bolder' }}> - </span> {dataBlog[i].title}</p>)
            }
        } else if(dataBlog.length >= 6) {
            for (var i = dataBlog.length - 1; i >= dataBlog.length - 5; i--) {
                let id = dataBlog[i]._id
                ContentHotNews.push(<p onClick={() => {
                    history.push(`/detailBlog/${id}`)
                }}> <span style={{ fontSize: '18px', fontWeight: 'bolder' }}> - </span> {dataBlog[i].title}</p>)
            }
        }
        return ContentHotNews
    }
    var ListBlosShuffle = null;
    var listBlogSmall = null;
    if (dataBlog) {
        ListBlosShuffle = shuffle(dataBlog)
        listBlogSmall = ListBlosShuffle.slice(1, dataBlog.length)
    }
    var WorldBlosShuffle = null;
    if (worldBlog) {
        WorldBlosShuffle = shuffle(worldBlog)
    }
    
    return (
        <BaseLayout1>
            <div className='container' style={{ paddingTop: '10px' }}>
                <div className='featured-Post' style={{ marginTop: '20px' }}>
                    <Row>
                        <Col span={16} md={16} sm={24} xs={24} style={{ border: '10px solid white' }}>
                            <Image style={{ width: "100%", height: '350px' }} src={dataBlog.length ? ListBlosShuffle[0].imagedetail : null} alt="" />
                            <div className='infor text-title'>
                                <h3 style={{ fontSize: '20px', fontWeight: 'bolder', color: 'white' }}
                                    onClick={() => {
                                        history.push(`/detailBlog/${ListBlosShuffle[0]._id}`)
                                    }}>{dataBlog.length ? ListBlosShuffle[0].title : null} </h3>
                            </div>

                        </Col>
                        <Col md={8}>
                            <div style={{ padding: '10px' }}>
                                <h3 style={{ fontSize: '20px', fontWeight: 'bolder', color: '#f69631' }}> BÀI VIẾT MỚI NHẤT</h3>
                                <tbody className='hot-news'>
                                    {hotNews()}
                                </tbody>
                            </div>


                        </Col>

                    </Row>


                </div>
                <div className='Category' style={{ padding: '10px', marginTop: '5px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bolder', color: '#f69631', }}> THỂ LOẠI </h3>
                    <Row>
                        <Button onClick={() => { history.push("/blogs/news") }} type="primary" style={{ marginLeft: '5px', marginTop: '3px' }}> Thời sự </Button>
                        <Button onClick={() => { history.push("/blogs/life") }} type="primary" style={{ marginLeft: '5px', marginTop: '3px' }}> Đời sống </Button>
                        <Button onClick={() => { history.push("/blogs/heath") }} type="primary" style={{ marginLeft: '5px', marginTop: '3px' }}> Sức khỏe </Button>
                        <Button type="primary" style={{ marginLeft: '5px', marginTop: '3px' }}> Bóng đá </Button>
                        <Button onClick={() => { history.push("/blogs/education") }} type="primary" style={{ marginLeft: '5px', marginTop: '3px' }}> Giáo dục </Button>
                        <Button onClick={() => { history.push("/blogs/technology") }} type="primary" style={{ marginLeft: '5px', marginTop: '3px' }}> Khoa học </Button>
                    </Row>
                </div>
                <Row>
                    <Col span={16} md={16} xs={24} >
                        <div className='news' style={{ marginTop: '20px', padding: '10px' }}>
                            <span style={{ fontSize: '20px', fontWeight: 'bolder', color: '#f69631', }}> TIN TỨC </span>
                            <Row style={{ paddingTop: '10px' }}>
                                <div className='list-news'>
                                    <Col md={24} sm={24} xs={24}>
                                        {
                                            dataBlog.length ? listBlogSmall.map((item, index) => {
                                                return (
                                                    <div className='text-title' style={{ marginTop: '20px' }}>
                                                        <h3 onClick={() => {
                                                            history.push(`/detailBlog/${item._id}`)
                                                        }}> {item.title} </h3>
                                                        <Row >
                                                            <Col md={8} sm={8} xs={8}>
                                                                <Image style={{ width: "100%", height: '122px' }}
                                                                    src={item.image}
                                                                >
                                                                </Image>
                                                            </Col>
                                                            <Col md={16} sm={16} xs={16} style={{ paddingLeft: '5px' }}>
                                                                <div className='list-content'>
                                                                    <p> {item.content}</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </div>

                                                )
                                            }) : null
                                        }
                                    </Col>
                                </div>
                            </Row>

                        </div>

                    </Col>
                    <Col span={8} md={8} xs={24} style={{ padding: '10px', marginTop: '20px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bolder', color: '#f69631', }}> TIN THẾ GIỚI </h3>
                        {worldBlog.length ? <div>
                            <Image style={{ width: "130%" }} src={WorldBlosShuffle[0].image} />
                            <div style={{ width: '100%', height: '350px', overflowY: 'scroll', paddingBottom: '8px' }}>
                                {WorldBlosShuffle.map((item, index) => {
                                    return <div key={index} className='text-title' style={{ paddingTop: '5px' }}>
                                        <h3 onClick={() => {
                                            history.push(`/detailBlog/${item._id}`)
                                        }}>{item.title}</h3>
                                        <p>{item.content.slice(0, 150)} </p>
                                        <hr />
                                    </div>

                                })}
                            </div>
                        </div> : null}
                        <img className='banner' style={{ width: '100%', paddingTop: '10px' }} src="https://news.mogi.vn/wp-content/uploads/2020/09/bannerbatdongsan041.jpg" alt="" />
                    </Col>
                </Row>
            </div>


        </BaseLayout1>
    )
}

export default Blog