import {message} from "antd";
import React, {useRef} from "react";
import PublishAdd from "./PublishAdd";
import {get} from "../../../utils/rest";
import DataTable from "../../../componet/datatable";
import openModal from "../../../componet/modal/openModal";
import {publishList} from "../../../config/require/require-list";
import {requireSearch} from "../../../config/require/require-search";

const PublishList = (props) => {
    const ref = useRef();
    const {reqType} = props;
    const param = {reqType: reqType, pageNum: 1, pageSize: 10};

    const button = [
        {name: '查看详情', type: 'primary', onclick: () => openPublishInfo},
        {name: '终止', type: 'primary', onclick: () => quit},
    ]

    /*查看详情*/
    const openPublishInfo = () => {
        let row = ref.current.getSelectedRow();
        if (!row) {
            message.error(`请选择一条记录!`);
            return;
        }
        get(`/require/getRequireInfo/` + row.reqId).then(res => {
            openModal(
                `查看详情`,
                <PublishAdd hidden={true} data={res.data.data} reqType={reqType} taskType={row.taskType}/>,
                () => tableRefresh(), ''
            );
        });
    }

    /*终止*/
    const quit = () => {
        let row = ref.current.getSelectedRow();
        if (!row) {
            message.error(`请选择一条记录!`);
            return;
        }
        get(`/require/termination` + row.reqId).then(res => {
            message.success(`已终止!`);
            tableRefresh();
        })
    }

    /*页面刷新*/
    const tableRefresh = () => {
        ref.current.refresh();
    }

    return (
        <DataTable
            ref={ref}
            param={param}
            button={button}
            primaryKey={'reqId'}
            columns={publishList}
            search={requireSearch}
            url={'/require/getPublishList'}
        />
    )
}

export default PublishList;
