import React from 'react';
import moment from "moment";
import {getParam} from "./method";
import {Button, Input, message} from "antd";
import {post} from "../../../utils/rest";
import DataInfo from "../../../componet/datainfo";
import {Consumer} from "../../../componet/modal/openModal";
import {getColumns} from "./method";

const {Search} = Input;

const PublishAdd = (props) => {
    let {data, reqType, taskType, hidden} = props;
    if (data && data.deadline) {
        data.deadline = moment(data.deadline, 'YYYY-MM-DD');
    }
    const ref = React.createRef();
    const columns = getColumns(reqType, taskType);

    /*导入关联需求*/
    const onSearch = value => {
    };

    if (reqType === '日常运营' || reqType === '系统任务') {
        columns[3].callback = select => selectColumns(select);
    }

    /*下拉框联动*/
    const selectColumns = (select) => {
        if (!select) select = 'TZ';
        let columns = getColumns(reqType, select);
        ref.current.setColumns(columns);
        let newParam = data ? data : {};
        newParam.taskType = select;
        ref.current.setParam(newParam);
    }

    /*保存*/
    const save = (operation) => {
        let data = ref.current.getData();
        data.taskType = data.taskType ? data.taskType : 'TZ';
        let param = getParam(reqType, taskType, data);
        post(`/require/save`, param).then(res => {
            message.success(`保存成功!`);
            quitInfo(operation);
        })
    }

    /*保存并发布*/
    const saveAndPublish = (operation) => {
        let data = ref.current.getData();
        data.taskType = data.taskType ? data.taskType : 'TZ';
        let param = getParam(reqType, taskType, data);
        ref.current.vaildValue().then(() => {
            post(`/require/saveAndPublish`, param).then(res => {
                message.success(`发布成功!`);
                quitInfo(operation);
            })
        })
    }

    /*退出*/
    const quitInfo = (operation) => {
        operation.close();
        operation.reload();
    }

    return (
        <Consumer>
            {
                (operation) =>
                    <div>
                        <div className={'button-group'}>
                            <Search placeholder="请输入关联需求编号:" style={{width: 355}} onSearch={onSearch} enterButton/>
                            <Button className={'bottom-button'} type={'default'}
                                    onClick={() => quitInfo(operation)}>退出</Button>
                            <Button className={'bottom-button'} type={'default'}
                                    onClick={() => saveAndPublish(operation)} hidden={hidden}>保存并发布</Button>
                            <Button className={'bottom-button'} type={'primary'}
                                    onClick={() => save(operation)}>保存</Button>
                        </div>
                        <div>
                            <DataInfo param={data} columns={columns} ref={ref}/>
                        </div>
                    </div>
            }
        </Consumer>
    )
}

export default PublishAdd;