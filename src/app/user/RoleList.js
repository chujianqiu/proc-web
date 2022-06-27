import React, {useRef} from "react";
import DataTable from "../../componet/datatable";
import {roleList} from "../../config/user/user-list";
import './style.css';
import {message} from "antd";
import openModal from "../../componet/modal/openModal";
import RoleInfo from "./RoleInfo";

/*角色管理*/
const RoleList = (props) => {
    const ref = useRef();
    const button = [
        {name: '新建角色', type: 'primary', onclick: () => openAddUser},
    ];

    roleList[5]['render'] = () => (
        <div>
            <a className={'edit-button'} onClick={() => openEditMoadl()}>编辑</a>
            <a className={'delete-button'} onClick={() => deleteRole()}>删除</a>
        </div>
    );

    //新增
    const openAddUser = () => {
        openModal(`新建角色`,<RoleInfo/>,()=>tableRefresh(),'');
    }


    //编辑
    const openEditMoadl = () => {
        let row = ref.current.getSelectedRow();
        if(!row){
            message.error(`请选择一条记录`);
            return;
        }

    }

    //删除
    const deleteRole = () => {

    }

    //页面刷新
    const tableRefresh = () => {
        ref.current.refresh();
    }


    return (
        <DataTable ref={ref} columns={roleList} primaryKey={'id'} url={'/role/list'} button={button}></DataTable>
    )
}

export default RoleList