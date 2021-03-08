import React, {useEffect, useState} from 'react';
import BaseLayout from "../../components/BaseLayout/BaseLayout";
import axios from "../../config/axios/axios"
import {useSelector} from "react-redux"
import "../blog/DetailBlog.css"
import { Col, Row , Image, Input, BackTop, Affix } from 'antd';
import {
    createFromIconfontCN ,LeftCircleOutlined, ArrowUpOutlined
} from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

function DetailBlog(props) {
    let [dataBlog, setDataBlog] = useState('')
    let idBlog = window.location.href.split('http://localhost:3000/detailBlog/')[1]
    let history = useHistory()
    const IconFont = createFromIconfontCN({
        scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
      });
    useEffect(()=> {
        axios({
            method: 'GET',
            url: `/detail-blog/${idBlog}`
        }).then((data) => {
            setDataBlog(data.data.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
    console.log()
    return (
        <BaseLayout>
            <div  style={{paddingBottom: "20px"}}>
                <Row>
                    <Col >
                        <Affix offsetTop={280} onChange={affixed => console.log(affixed)}>
                        <div className="icon-fix">
                            <div>  <LeftCircleOutlined onClick={()=> {
                                history.push("/blog")
                            }} />  </div>
                            <div> <IconFont type="icon-facebook" /> </div>
                            <div> <IconFont type="icon-twitter" /> </div>
                        </div>
                    
                        </Affix >
                            { <div style={{background: "#fcfaf6"}}>
                                <div className="container" style={{padding: "25px"}}>
                                        <h1 style={{paddingBottom: "20px"}}> {dataBlog.title}  </h1>
                                        <div style={{textAlign: "center", paddingBottom: "20px"}}>
                                            <Image style={{width: "100%", height: '100%'}} 
                                                src= {dataBlog.image}
                                            >
                                            </Image>

                                        </div>
                                        <h3> {dataBlog.content}   </h3>


                                </div>
                            </div>
                            }
                            < hr style={{height: "3px"}}/>
                            <div style={{paddingBottom: "30px"}}>
                                <div className="container">
                                    <h3 style={{fontSize: "20px", paddingBottom: "20px"}}> Comments </h3>
                                    <Input placeholder="Y kien cua ban " type="text"/>
                                    <button type="button" style={{marginTop: "10px", marginBottom: "20px", padding: "3px"}}> gui binh luan </button>
                                    <div>
                                        <Row style={{marginTop: "10px"}}>
                                            <Col span={1}>
                                                <div className="avatar">
                                                    <img src="https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-doremon-cute.jpg"/>
                                                </div>
                                            </Col>
                                            <Col span={23} style={{paddingLeft: "10px"}}>
                                            <span style={{ fontWeight: "500" , paddingRight: "10px"}}> Nguyen Hung Vuong </span>
                                            <span> phải sử lý thật nặng tội danh này. Minh cũng là nạn nhân của những vụ mua bán thông tin này, Mình có căn hộ mới nhận nhà ở Q9 nhưng ngày nào cũng bị những cuộc gọi đt tra tấn của bọn cò ( ko có lương tâm). có khi là trong giờ làm việc, khi là giờ nghỉ trưa, khi đang đi trên đường, có ngày mấy cuộc gọi hỏi có bán nhà hoặc cho thuê nhà ko. Thông tin mình có căn hộ ở khu đó mấy con cò đó lấy ở đâu ra..</span>    
                                            </Col>
                                        </Row>
                                        <Row style={{marginTop: "15px"}}>
                                            <Col span={1}>
                                                <div className="avatar">
                                                    <img src="http://hinhnendephd.com/wp-content/uploads/2019/10/anh-avatar-dep.jpg"/>
                                                </div>
                                            </Col>
                                            <Col span={23} style={{paddingLeft: "10px"}}>
                                            <span style={{ fontWeight: "500" , paddingRight: "10px"}}>  Pham van duy </span>
                                            <span> phải sử lý thật nặng tội danh này. Minh cũng là nạn nhân của những vụ mua bán thông tin này, Mình có căn hộ mới nhận nhà ở Q9 nhưng ngày nào cũng bị những cuộc gọi đt tra tấn của bọn cò ( ko có lương tâm). có khi là trong giờ làm việc, khi là giờ nghỉ trưa, khi đang đi trên đường, có ngày mấy cuộc gọi hỏi có bán nhà hoặc cho thuê nhà ko. Thông tin mình có căn hộ ở khu đó mấy con cò đó lấy ở đâu ra..</span>    
                                            </Col>
                                        </Row>
                                        <Row style={{marginTop: "15px"}}>
                                            <Col span={1}>
                                                <div className="avatar">
                                                    <img src="https://static.yeah1.com/uploads/editors/27/2020/06/11/0k2E4QTDTs0Sx0gyeemCmcTx5v0JNxpYu062PvcV.jpeg"/>
                                                </div>
                                            </Col>
                                            <Col span={23} style={{paddingLeft: "10px"}}>
                                            <span style={{ fontWeight: "500" , paddingRight: "10px"}}> Pham tuan anh </span>
                                            <span> phải sử lý thật nặng tội danh này. Minh cũng là nạn nhân của những vụ mua bán thông tin này, Mình có căn hộ mới nhận nhà ở Q9 nhưng ngày nào cũng bị những cuộc gọi đt tra tấn của bọn cò ( ko có lương tâm). có khi là trong giờ làm việc, khi là giờ nghỉ trưa, khi đang đi trên đường, có ngày mấy cuộc gọi hỏi có bán nhà hoặc cho thuê nhà ko. Thông tin mình có căn hộ ở khu đó mấy con cò đó lấy ở đâu ra..</span>    
                                            </Col>
                                        </Row>
                                       {/* <div className='avatar' >
                                         <img src="https://phunugioi.com/wp-content/uploads/2020/10/hinh-anh-avatar-doremon-cute.jpg"/>
                                         <span style={{paddingLeft: "10px", fontWeight: "500" , paddingRight: "10px"}}> Nguyen Hung Vuong </span>
                                         <span> phải sử lý thật nặng tội danh này. Minh cũng là nạn nhân của những vụ mua bán thông tin này, Mình có căn hộ mới nhận nhà ở Q9 nhưng ngày nào cũng bị những cuộc gọi đt tra tấn của bọn cò ( ko có lương tâm). có khi là trong giờ làm việc, khi là giờ nghỉ trưa, khi đang đi trên đường, có ngày mấy cuộc gọi hỏi có bán nhà hoặc cho thuê nhà ko. Thông tin mình có căn hộ ở khu đó mấy con cò đó lấy ở đâu ra..</span>   
                                       </div> */}
                                    </div>
                                </div>
                               
                            </div>
                           
                            <BackTop>
                                <ArrowUpOutlined className="backTop"/>
                            </BackTop>
                    </Col>

                </Row>
            </div>
         </BaseLayout>
    );
}

export default DetailBlog;