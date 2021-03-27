import React, { useEffect, useState } from 'react';
import axios from "../../config/axios/axios";
import BaseLayout from "../../components/BaseLayout/BaseLayout1"
import "./Users.css"
import { Table, Space, Avatar, Image, Popconfirm, message, Button, Modal} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
function Users(props) {
    let [data, setData] = useState("");
    let [dataSearch, setDataSearch] = useState("")
    let [overview, setOverview] = useState(false)
    let [visible, setVisible] = useState(false);
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")
    let [id, setId] = useState("")
    const texts = 'Are you sure to delete this user?';
    useEffect(() => {
        axios({
            method: "GET",
            url: "/user"
        })
            .then((result) => {
                let dataChange = result.data.data.map((item, index) => {
                    let source = {
                        avatar: item.avatar.length === 1 ? <Avatar>{item.avatar}</Avatar> :
                            <Avatar src={<Image src={`${item.avatar}`}></Image>}></Avatar>,
                        key: index
                    }

                    return Object.assign(item, source)
                })
                setData(dataChange)
            })
            .catch((err) => {
                alert(err.response.data.message);
            })
    }, [overview])
    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Action',
            dataIndex: '_id',
            key: 'action',
            render: (dataIndex, record) => (
                <Space size="middle">
                    <Button onClick={() => {
                        setId(dataIndex)
                        setVisible(true)
                    }}>Edit</Button>    
                    <Popconfirm placement="top" title={texts} onConfirm={() => {
                        axios({
                            method: "DELETE",
                            url: `/user/${dataIndex}`
                        })
                            .then((res) => {
                                setOverview(!overview)
                                message.info('Delete success');
                            })

                    }} okText="Yes" cancelText="No">
                        <Button>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ]
    const modalUser = (
        <Modal
            title="Edit user"
            visible={visible}
            onOk={() => {
                axios({
                    method: "PUT",
                    url: `/user/${id}`,
                    data: {
                        username: username,
                        password: password
                    }
                })
                    .then((res) => {
                        setOverview(!overview)
                        setVisible(false)
                    })
                    .catch((err)=>{
                        alert(err.response.data.message)
                    })
            }}
            onCancel={() => {
                setVisible(false)
            }}
        >
            <p>Username</p>
            <input style={{ border: "1px solid black", width: "90%", height: "30px", outline: "none", padding: "0px 15px" }} type="text" placeholder="Nhập username"
                onChange={(e) => {
                    setUsername(e.target.value)
                }}
            />
            <p style={{ marginTop: "15px" }}>Password</p>
            <input style={{ border: "1px solid black", width: "90%", height: "30px", outline: "none", padding: "0px 15px" }} type="text" placeholder="Nhập password"
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
            />
        </Modal>
    )
    return (
        <BaseLayout>
            {modalUser}
            <div className="user-findUser">
                <input type="text" placeholder="Search user you want" onChange={(e) => {
                    setDataSearch(e.target.value)
                }} />
                <button onClick={() => {
                    if (data) {
                        if (dataSearch) {
                            let dataFiter = data.filter((item) => {
                                return item.username.includes(dataSearch) || item.email.includes(dataSearch)
                            });
                            setData(dataFiter)
                        }
                    }
                }
                }><SearchOutlined></SearchOutlined></button>
            </div>
            <div className="users">
                <Table
                    className="users-table"
                    columns={columns}
                    dataSource={data}
                />
            </div>
        </BaseLayout>
    );
}

export default Users;