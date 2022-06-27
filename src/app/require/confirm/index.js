import React, {useRef} from "react";
import {message} from "antd";
import ConfirmInfo from "./ConfirmInfo";
import {get} from "../../../utils/rest";
import ConfirmOperation from "./ConfirmOperation";
import DataTable from "../../../componet/datatable";
import openModal from "../../../componet/modal/openModal";
import {confirmList} from "../../../config/require/require-list";

const ConfirmList = (props) => {
    const ref = useRef();
    const {userId, userName} = props.param.user;

    const button = [
        {name: '查看详情', type: 'primary', onclick: () => veiewInfo},
        {name: '开始确认', type: 'primary', onclick: () => confirm}
    ]

    /*查看详情*/
    const veiewInfo = () => {
        let row = ref.current.getSelectedRow();
        if (!row) {
            message.error(`请选择一条记录!`);
            return;
        };

        get(`/require/getRequireInfo/` + row.reqId).then(res=>{
            openModal(`查看详情`,
                <ConfirmOperation
                    data={res.data}
                    userId={userId}
                    userName={userName}
                    reqType={row.reqType}
                    taskType={row.taskType}
                />,
                () => tableRefresh(), '60%');
        })
    }

    const getRequireInfo = async (reqId) => {
        let data = {};
        let suggestion = '';
        await get(`/requirement/getInfo.do`, {userid: userId, reqid: reqId}).then(res => {
            data = res.data.value;
        })
        await get(`/requirement/getReviewInfo.do`, {userid: userId, reqid: reqId}).then(res => {
            suggestion = res.data.value.review_suggestion;
        })
        return {data: data, suggestion: suggestion};
    }


    /*开始确认*/
    const confirm = () => {
        let row = ref.current.getSelectedRow();
        if (!row) {
            message.error(`请选择一条记录!`);
            return;
        }
        openModal(`开始确认`,
            <ConfirmInfo
                userId={userId}
                userName={userName}
            />,
            () => tableRefresh(), '40%');
/*        get(`/require/getRequireInfo/` + row.reqId).then(res => {
            openModal(`开始确认`,
                <ConfirmInfo
                    userId={userId}
                    userName={userName}
                    reqTopic={row.reqTopic}
                    reqId={row.reqId}
                    suggestion={res.data.value.review_suggestion}
                />,
                () => tableRefresh(), '40%');
        })*/
    }


    const tableRefresh = () => {
        ref.current.refresh();
    }

    return (
        <DataTable
            ref={ref}
            button={button}
            url={'/require/getUnReviewList'}
            param={{status:'3'}}
            primaryKey={'reqId'}
            columns={confirmList}
        />
    )

}

export default ConfirmList;