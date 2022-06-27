import React from "react";
import {Avatar, Image, Layout, Menu} from "antd";
import HeaderDropdown from "../../componet/headerdropdown";
import {LogoutOutlined} from "@ant-design/icons";
import {withRouter} from "react-router-dom";
import ProMenu from "../../componet/menu";
import {post} from "../../utils/rest";
import styles from "./index.less";
import './style.css';

const {Header, Sider, Content} = Layout;

/*总体布局架构(flex布局)*/
const LayoutFrame = (props) => {
    const domain = window.location.host;
    const {columns, menu, user} = props.param;
    const {history, content} = props;
    const userName = user['nickName'];

    /*退出操作*/
    const menuOperation = (data) => {
        if (data.key === 'logout') {
            post(`/user/logout`).then(() => {
                history.push({pathname: '/login'});
            })
        }
        sessionStorage.clear();
    }

    /*用户下拉框*/
    const menuHeaderDropdown = (
        <Menu className={styles.menu} selectedKeys={[]} onClick={menuOperation}>
            <Menu.Divider/>
            <Menu.Item key="logout"><LogoutOutlined/>退出登录</Menu.Item>
        </Menu>
    );

    return (
        <Layout style={{height: '100%', overflow: 'hidden'}}>
            <Sider className='site-layout-background' style={{textAlign: 'center'}}>
                <Image src={'http://' + domain + '/logo.png'}/>
                <ProMenu columns={columns} history={history} menu={menu} user={user}/>
            </Sider>
            <Layout>
                <Header className="header">
                    <HeaderDropdown overlay={menuHeaderDropdown} className={"dropdown"}>
                    <span className={`${styles.action} ${styles.account}`}>
                        <Avatar size="large" className={styles.avatar} alt="avatar"
                                src={'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'}/>
                        <span className={`userName anticon`}>{userName}</span>
                    </span>
                    </HeaderDropdown>
                </Header>
                <Content className="site-layout-background">
                    {content}
                </Content>
            </Layout>
        </Layout>
    )
}


export default withRouter(LayoutFrame)