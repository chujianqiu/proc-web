import React from "react";
import {Menu} from "antd";
import './style.css';
import PublishTab from "./PublishTab";
/*需求发布-菜单树*/
const PublishTree = (props) => {
    const {user} = props.param;
    return (
        <div className={"publish-tree"}>
            <div className={"publish-menu"}>
                <Menu mode='inline' className="require-menu" defaultSelectedKeys={['daily']} defaultOpenKeys={['daily']}>
                    <Menu.Item key={'daily'}>日常运营</Menu.Item>
                    <Menu.Item key={'poc'}>客户POC</Menu.Item>
                    <Menu.Item key={'task'}>专项任务</Menu.Item>
                    <Menu.Item key={'check'}>问题排查</Menu.Item>
                    <Menu.Item key={'other'}>其他</Menu.Item>
                </Menu>
                <div className={"publish-content"}>
                    <PublishTab user = {user} reqType={'日常运营'}/>
                </div>
            </div>
        </div>
    )
}

export default PublishTree

