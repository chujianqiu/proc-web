import React, {useRef} from "react";
import {message} from "antd";
import ReviewInfo from "./ReviewInfo";
import {get} from "../../../utils/rest";
import RequireInfo from "./RequireInfo";
import DataTable from "../../../componet/datatable";
import openModal from "../../../componet/modal/openModal";
import {reviewList} from "../../../config/require/require-list";

const ReviewList = () => {
    const ref = useRef();
    const button = [
        {name: '查看详情', type: 'primary', onclick: () => veiewInfo},
        {name: '开始评审', type: 'primary', onclick: () => review}
    ]

    /*查看详情*/
    const veiewInfo = () => {
        let row = ref.current.getSelectedRow();
        if (!row) {
            message.error(`请选择一条记录!`);
            return;
        }
        let {reqId, reqType, taskType, reqTopic} = row;
        get(`/require/getRequireInfo/` + row.reqId).then(res => {
            openModal(
                `查看详情`,
                <RequireInfo hidden={true} data={res.data.data} reqId={reqId} reqType={reqType} taskType={taskType}
                             reqTopic={reqTopic}/>,
                () => tableRefresh(),
                '60%'
            );
        });
    }

    /*开始评审*/
    const review = () => {
        let row = ref.current.getSelectedRow();
        if (!row) {
            message.error(`请选择一条记录!`);
            return;
        }
        let {reqId, reqType, taskType, reqTopic} = row;
        openModal(`开始评审`,
            <ReviewInfo reqId={reqId} reqTopic={reqTopic} reqType={reqType} taskType={taskType}/>,
            () => tableRefresh(),
            '40%'
        )
    }

    const tableRefresh = () => {
        ref.current.refresh();
    }

    return (
        <DataTable
            ref={ref}
            button={button}
            columns={reviewList}
            primaryKey={'reqId'}
            url={'/require/getUnReviewList'}/>
    )
}

export default ReviewList
