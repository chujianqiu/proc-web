import React from "react";
import {Result} from "antd";
import {SmileOutlined} from '@ant-design/icons';
/*非权限用户提示页面*/
const NoAccessPage = () => {
    return (
        <Result
            icon={<SmileOutlined/>}
            title='您好，您不是权限用户,请申请相关权限！'
        />
    )
}

export default NoAccessPage;