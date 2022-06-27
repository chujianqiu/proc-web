import React from 'react';
import 'antd/dist/antd.css';
import {Breadcrumb} from 'antd';

const BreadCrumb = () => {
    const getBread = () => {
        let bread = sessionStorage.getItem('bread').split(',').reverse();
        let object = bread.map((item) => <Breadcrumb.Item>{item}</Breadcrumb.Item>)
        return object;
    }
    return (
        <Breadcrumb>
            {getBread()}
        </Breadcrumb>
    )
}
export default BreadCrumb