import React, { useEffect, useState } from 'react';

import { Col, Row, Image, Button ,Input, BackTop, Affix, Avatar, Carousel  } from 'antd';
import "./Blog2.css"
import axios from "../../config/axios/axios"
import { useHistory } from 'react-router-dom';
import BaseLayout1 from "../../components/BaseLayout/BaseLayout1";
function Blog2(){
    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
      };
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
        const hotNews = () => {
            let ContentHotNews =[]
            for( var i = dataBlog.length-1; i >= 2 ; i--){
                ContentHotNews.push(<p > <span  style={{fontSize: '18px', fontWeight: 'bolder'}}> - </span> {dataBlog[i].title}</p>)
            }
            return ContentHotNews
        }

    return(
        <BaseLayout1>
            <div className='container'style={{paddingTop: '10px'}}>
                <div className='featured-Post' style={{marginTop: '20px'}}>
                    <Row>
                        <Col span={16} md={16} sm={24} xs={24} style={{ border: '10px solid white'}}>
                                <Image style={{width: "100%", height: '350px'}} src= {dataBlog.length ? dataBlog[0].image : null}  alt=""/>
                                <div className='infor text-title'>
                                    <h3 style={{fontSize:'20px', fontWeight: 'bolder', color: 'white'}}
                                    onClick={()=>{
                                        history.push(`/detailBlog/${dataBlog[0]._id}`)
                                    }}>{dataBlog.length ? dataBlog[0].title : null} </h3>
                                </div>
                             
                        </Col>
                        <Col md={8}>
                            <div style={{padding: '10px'}}>
                                <h3 style={{fontSize: '20px' ,fontWeight: 'bolder', color:'#f69631'}}> BÀI VIẾT MỚI NHẤT</h3>
                                <tbody className='hot-news'>
                                    {hotNews()}
                                </tbody>
                            </div>

                          
                        </Col>
                       
                    </Row>
                
                
                </div>
                <div className='Category' style={{padding: '10px', marginTop: '15px'}}>
                                <h3 style={{fontSize: '20px' ,fontWeight: 'bolder', color:'#f69631', }}> THỂ LOẠI </h3>
                                <Row>
                                <Button type="primary" style={{marginLeft: '5px', marginTop: '3px'}}> Đời sống </Button>
                                <Button type="primary" style={{marginLeft: '5px', marginTop: '3px'}}> Sức khỏe </Button>
                                <Button type="primary" style={{marginLeft: '5px',marginTop: '3px'}}> Bóng đá </Button>
                                <Button type="primary" style={{marginLeft: '5px',marginTop: '3px'}}> Giao dục </Button>
                                <Button type="primary" style={{marginLeft: '5px', marginTop: '3px'}}> Công nghệ </Button>


                                </Row>
                           </div>
                <Row>
                    <Col span={16} md={16} xs={24} >
                    <div className='news' style={{marginTop: '20px', padding: '10px'        }}>
                                <span style={{fontSize: '20px' ,fontWeight: 'bolder', color:'#f69631', }}> TIN TỨC </span>
                                <Row style={{paddingTop: '10px'}}>
                                    <div className='list-news'>
                                        <Col md={24} sm={24} xs={24}>
                                            {
                                                dataBlog.length ? listBlog.map((item, index) => {
                                                    return (
                                                        <div className='text-title' style={{marginTop: '20px'}}>
                                                            <h3   onClick={()=>{
                                                                    history.push(`/detailBlog/${item._id}`)
                                                                }}> {item.title} </h3>
                                                            <Row >
                                                                <Col md={8} sm={8} xs={8}>
                                                                    <Image style={{width: "100%", height: '122px'}}
                                                                        src= {item.image}
                                                                    >
                                                                    </Image>
                                                                </Col>
                                                                <Col md={16} sm={16} xs={16} style={{paddingLeft: '5px'}}>
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
                    <Col span={8} md={8} xs={24} style={{padding: '10px', marginTop: '20px'}}>
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
                        <iframe className='banner' style={{width:'100%', marginTop: '30px', height: '600px', border: 'none'}} src="https://ds.polyad.net/ads/f/ford/2021/03/03/49706/300x600/dfp/pc/std/fixed/?link=https%3A%2F%2Fadclick.g.doubleclick.net%2Fpcs%2Fclick%3Fxai%3DAKAOjssX1POt0FWPD1v12IVJE-DKPcCU_g7_kqzUerF2rb3ga_NFJElpKPcRJZowMUwM03eJRYv_OXX4sm-4HtNvzZr5IAsmrEdbRRU1MFLC0w559RpMtQq38_eImSKatlWpE3Xxcirp8tdhUwjgJKK6gq-1xd_onlB4VzbVFU8PLW4amhjTklpOlrPHqhUmNqpam_r1i_18BaqWLX3KXXgdE8Li4CNr3XeGr76Fe5Kjog_nw-43nCyfInQBxQOebeito6rAckIMp_rCaFTFH0MXZnBQNDPBzkCt963k3m5XLnA9z1Z7d2VKeucWGqOLllwit-nz96N0EG_h5gEMQiDZi-ZOCJ44aRk%26sai%3DAMfl-YQrHstZkV04d2C5iY3x4N0QzpGAtNiblDpOfJaXY8YwYMCJkvInWBy2vW2bUgOCcB9e0VgsOFaEoBZAKjvErPgF2ad0AssJiGAHZhUYANcOn9-HJ_bXQz-IpeHI8lJSfLaA%26sig%3DCg0ArKJSzNLc_yh-2Cu1EAE%26urlfix%3D1%26adurl%3Dhttps%253A%252F%252Fad.doubleclick.net%252Fddm%252Ftrackclk%252FN952192.139161VNEXPRESSVN%252FB25226709.297317116%253Bdc_trk_aid%253D490127882%253Bdc_trk_cid%253D146840603%253Bdc_lat%253D%253Bdc_rdid%253D%253Btag_for_child_directed_treatment%253D%253Btfua%253D%253Bgdpr%253D%253Bgdpr_consent%253D%253Bltd%253D&otherlink=&campaign_name=EverestSport&index_brand=GB1006.3_Ford&index_industrial=G1006_Xe%20-%20ph%E1%BB%A5%20ki%E1%BB%87n%20xe" alt=""/>
                    </Col>
                </Row>
            </div>
            
              
        </BaseLayout1>
    )
}

export default Blog2