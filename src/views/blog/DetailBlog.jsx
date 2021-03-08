import React from 'react';
import BaseLayout from "../../components/BaseLayout/BaseLayout";
import { FacebookOutlined
} from '@ant-design/icons';
import {useSelector} from "react-redux"
import "../blog/DetailBlog.css"

function DetailBlog(props) {
    let idData = useSelector(state=> state.idBlogReducers)
    return (
        <BaseLayout>
            <div className="detailblog">
                {idData.idBlog}
            </div>
        </BaseLayout>
    );
}

export default DetailBlog;