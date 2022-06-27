import React, {useRef} from "react";
import {message} from "antd";
import PublishAdd from "./PublishAdd";
import {get, post} from "../../../utils/rest";
import DataTable from "../../../componet/datatable";
import openModal from "../../../componet/modal/openModal";
import {unPublishList} from "../../../config/require/require-list";

const UnPublishList = (props) => {
    const {reqType} = props;
    const ref = useRef();
    const param = {reqType: reqType};
    const button = [
        {name: '新增需求', type: 'primary', onclick: () => openPublishAdd},
        {name: '编辑', type: 'primary', onclick: () => openPublishInfo},
        {name: '发布', type: 'primary', onclick: () => publish},
        {name: '删除', type: 'primary', danger: true, onclick: () => deleteData},
    ];

    if (reqType === '系统任务') {
        button.splice(0, 1);
    }

    /*新增需求*/
    const openPublishAdd = () => {
        openModal(`新增需求`, <PublishAdd hidden={false} reqType={reqType}/>, () => tableRefresh(), '');
    }

    /*编辑*/
    const openPublishInfo = () => {
        let row = ref.current.getSelectedRow();
        if (!row) {
            message.error(`请选择一条记录!`);
            return;
        }
        get(`/require/getRequireInfo/` + row.reqId).then(res => {
            openModal(
                `需求编辑`,
                <PublishAdd hidden={false} data={res.data.data} reqType={reqType} taskType={row.taskType}/>,
                () => tableRefresh(), ''
            );
        })
    }

    /*发布*/
    const publish = () => {
        let row = ref.current.getSelectedRow();
        if (!row) {
            message.error(`请选择一条记录!`);
            return;
        }
        post(`/require/create/` + row.reqId).then((res) => {
            if (res.data.code === 200) {
                message.success(`发布成功!`);
                tableRefresh();
            } else {
                message.error(`发布失败!`);
            }
        })
    }

    /*删除*/
    const deleteData = () => {
        let row = ref.current.getSelectedRow();
        if (!row) {
            message.error(`请选择一条记录`);
            return;
        }
        post(`/require/remove/` + row.reqId).then((res) => {
            if (res.data.code === 200) {
                message.success(`删除成功!`);
                tableRefresh();
            } else {
                message.error(`删除失败!`);
            }
        })
    }

    /*列表刷新*/
    const tableRefresh = () => {
        ref.current.refresh();
    }

    return (
        <DataTable
            ref={ref}
            param={param}
            button={button}
            primaryKey={'reqId'}
            columns={unPublishList}
            url={'/require/getUnPublishList'}
        />
    )

}

export default UnPublishList;

