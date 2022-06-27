import React from "react";
import {Menu} from "antd";
import {Icon} from "../icon";
import {Link} from "react-router-dom";
import {Scrollbars} from 'react-custom-scrollbars';
import {observer} from "mobx-react";
import {useStore} from "../../store/useStore";

const {SubMenu} = Menu;

/*菜单组件*/
const ProMenu = observer((props) => {
    const {menu, user} = props;
    const menuStore = useStore().store.menuStore;
    /*获得菜单信息*/
    const getMenu = () => {
        let array = [];
        for (let i = 0; i < menu.length; i++) {
            let parent = menu[i];
            array.push(formMenu(parent))
        }
        return array;
    }

    /*生成菜单*/
    const formMenu = (parent) => {
        let menu;
        let {title, icon, url, path} = parent;
        url = url ? url : '/home';
        let data = {user: user, path: path, name: title};
        if (parent.children.length > 0) {
            let child = parent.children;
            menu = (
                <SubMenu key={title} title={title} icon={<Icon type={icon}/>}>
                    {
                        child.map(item => {
                            return formMenu(item);
                        })
                    }
                </SubMenu>
            )
        } else {
            menu = (
                <Menu.Item key={title} icon={<Icon type={icon}/>}>
                    <Link to={{pathname: url, state: {data: data}}}>{title}</Link>
                </Menu.Item>
            )
        }
        return menu;
    }

    //菜单点击操作
    const onMenuClick = (e) => {
        let selectMenu = [];
        let key = e['key'];
        let openMenu = e['keyPath'];
        selectMenu.push(key);
        menuStore.setSelectMenu(selectMenu);
        menuStore.setOpenMenu(openMenu);
    }

    //获取菜单打开项
    const getOpenKey = () => {
        let openMenu = menuStore.getOpenMenu() ? menuStore.getOpenMenu() : [];
        if (openMenu.length === 0) {
            openMenu.push(menu[0]['title']);
        }
        return openMenu;
    }

    //获取菜单选中项
    const getSelectKey = () => {
        let selectMenu = menuStore.getSelectMenu() ? menuStore.getSelectMenu() : [];
        if (selectMenu.length === 0) {
            selectMenu.push(menu[0]['children'][0]['title']);
        }
        return selectMenu;
    }

    return (
        <Scrollbars>
            <Menu
                theme='dark'
                mode="inline"
                defaultOpenKeys={() => getOpenKey()}
                defaultSelectedKeys={() => getSelectKey()}
                onClick={(e) => onMenuClick(e)}
                style={{height: 'auto', borderRight: 0}}>
                {getMenu()}
            </Menu>
        </Scrollbars>
    )
})


export default ProMenu