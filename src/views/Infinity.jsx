// import React, { useState, useEffect } from 'react';
// import axios from "../config/axios/axios";
// import { useHistory} from "react-router-dom"
// import { Image } from 'antd';
// export default function InfiniteList(props) {
//     let history = useHistory()
//     const [loadMore, setLoadMore] = useState(true);
//     let [data, setData] = useState("")
//     useEffect(() => {
//         getData(loadMore);
//         setLoadMore(false);
//     }, [loadMore]);

//     useEffect(() => {
//         const list = document.getElementById('list')
//         if (props.scrollable) {
//             // list has fixed height
//             list.addEventListener('scroll', (e) => {
//                 const el = e.target;
//                 if (el.scrollTop + el.clientHeight === el.scrollHeight) {
//                     setLoadMore(true);
//                 }
//             });
//         } else {
//             // list has auto height  
//             window.addEventListener('scroll', () => {
//                 if (window.scrollY + window.innerHeight === list.clientHeight + list.offsetTop) {
//                     setLoadMore(true);
//                 }
//             });
//         }
//     }, []);

//     useEffect(() => {
//         const list = document.getElementById('list');

//         if (list.clientHeight <= window.innerHeight && list.clientHeight) {
//             setLoadMore(true);
//         }
//     }, [props.state]);


//     const getData = (load) => {
//         if (load) {
//             axios({
//                 method: "GET",
//                 url: "/blog"
//             }).then((res) => {
//                 setData(res.data.data)
//             })
//         }
//     };

//     return (
//         <div id="list">
//             {
//                 data.length ? data.map((item, index) => {
//                     return (
//                         <div className="lists-blog" key={index}>
//                             <h4 onClick={() => {
//                                 history.push(`/detailBlog/${item._id}`)
//                             }}>{item.title}</h4>
//                             <div className="blog-child">
//                                 <Image className="blog-child-image"
//                                     src={item.image}
//                                 >
//                                 </Image>
//                                 <div className="blog-child-title">
//                                     <p>{item.content}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     )
//                 }) : null
//             }
//         </div>
//     );
// };