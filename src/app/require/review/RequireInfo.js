import React, {useEffect, useState} from "react";
import {get, post} from "../../../utils/rest";
import {getColumns} from "../publish/method";
import DataInfo from "../../../componet/datainfo";
import {Consumer} from "../../../componet/modal/openModal";
import {Divider, Form, Input, Row, Col, Select, message, Button} from "antd";
import moment from "moment";

const Option = Select;

const RequireInfo = (props) => {
    const ref = React.createRef();
    let {data, reqId, reqType, taskType, reqTopic} = props;
    data.deadline = moment(data.deadline, 'YYYY-MM-DD');
    const columns = getColumns(reqType, taskType);


    const [form] = Form.useForm();
    const [userName, setUserName] = useState([]);

    useEffect(() => {
        get(`/require/getHanderUser`).then(res => {
            setUserName(res.data.data);
        })
    }, [])

    /*拒收*/
    const refuse = (operation) => {
        let handlerUser = form.getFieldValue('handlerUser');
        let suggestion = form.getFieldValue('reviewSuggestion');
        if (suggestion) {
            message.error(`请填写评审建议!`);
            return;
        }
        post(`/require/reject`, {reqId: reqId, handlerUser: handlerUser, suggestion: suggestion}).then(res => {
            if (res.data.code === 200) {
                message.success(reqTopic + `已拒收`);
                quitInfo(operation);
            } else {
                message.success(reqTopic + `拒收失败`);
            }
        })
    }

    /*通知*/
    const notice = (operation) => {
        let handlerUser = form.getFieldValue('handlerUser');
        let suggestion = form.getFieldValue('reviewSuggestion');
        let param = {reqId: reqId, handlerUser: handlerUser, suggestion: suggestion};
        post(`/require/notice`, param).then(res => {
            if (res.data.code === 200) {
                message.success(reqTopic + `审批通过`);
                quitInfo(operation);
            } else {
                message.success(reqTopic + `审批不通过`);
            }
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
                    <div style={{margin: '10px'}}>
                        <div className={'button-group'}>
                            <Button className={'bottom-button'} type={'default'}
                                    onClick={() => quitInfo(operation)}>退出</Button>
                            <Button className={'bottom-button'} type={'default'}
                                    onClick={() => refuse(operation)}>拒收</Button>
                            <Button className={'bottom-button'} type={'primary'}
                                    onClick={() => notice(operation)}>通知</Button>
                        </div>
                        <DataInfo columns={columns} param={data} readOnly={true} ref={ref}/>
                        <Divider/>
                        <Form form={form}>
                            <Row span={24}>
                                <Col span={8} key={'handlerUser'}>
                                    <Form.Item label={'通知负责人'} key={'handlerUser'} name={'handlerUser'}
                                               rules={[{required: true, message: '请选择通知负责人!'}]}>
                                        <Select>
                                            {
                                                userName.map((item, i) => {
                                                    return <Option key={i}
                                                                   value={item.username}>{item.nickName}</Option>
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={16} key={'reviewSuggestion'}>
                                    <Form.Item label={'评审建议'} key={'reviewSuggestion'} name={'reviewSuggestion'}
                                               rules={[{required: true, message: '请填写评审建议!'}]}>
                                        <Input.TextArea key={'reviewSuggestion'}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>
            }
        </Consumer>
    )
}

export default RequireInfo