import React from "react";
import {get} from "../../../utils/rest";
import DataInfo from "../../../componet/datainfo";
import {Consumer} from "../../../componet/modal/openModal";
import {getColumns} from "../publish/method";
import {Button, Col, Divider, Form, Input, message, Row} from "antd";

const ConfirmOperation = (props) => {
    const time = new Date();
    const [form] = Form.useForm();
    const ref = React.createRef();
    let {userId, userName, reqId, reqTopic, reqType, taskType, data, suggestion} = props;
    const columns = getColumns(reqType, taskType);

    const quit = (operation) => {
        operation.close();
    }

    const receive = (operation) => {
        let response = form.getFieldValue('handlerresponse');
        let param = {reqid: reqId, userid: userId, handlerresponse: response}
        form.validateFields().then(() => {
            get(`/requirement/handlerAccept.do`, param).then(res => {
                if (res.data.msg === 'success') {
                    message.success(reqTopic + `已接收`);
                    operation.close();
                    operation.reload();
                } else {
                    message.error(reqTopic + `接受失败`);
                }
            })
        })
    }

    const refuse = (operation) => {
        let response = form.getFieldValue('handlerresponse');
        let param = {reqid: reqId, userid: userId, handlerresponse: response}
        form.validateFields().then(() => {
            get(`/requirement/handlerRefuse.do`, param).then(res => {
                if (res.data.msg === 'success') {
                    message.success(reqTopic + `已拒收`);
                    operation.close();
                    operation.reload();
                } else {
                    message.error(reqTopic + `拒收失败`);
                }
            })
        })
    }

    return (
        <Consumer>
            {
                (operation) =>
                    <div>
                        <div className={'button-group'}>
                            <Button className={'bottom-button'} type={'default'}
                                    onClick={() => quit(operation)}>退出</Button>
                            <Button className={'bottom-button'} type={'default'}
                                    onClick={() => refuse(operation)}>拒收</Button>
                            <Button className={'bottom-button'} type={'primary'}
                                    onClick={() => receive(operation)}>接收</Button>
                        </div>
                        <DataInfo columns={columns} readOnly={true} param={data} ref={ref}/>
                        <Divider/>
                        <Form form={form}>
                            <Row>
                                <Col span={8}>
                                    <Form.Item label={'评审人'} key={'reviewer'} name={'reviewer'} initialValue={userName}>
                                        <Input disabled={true} value={userName}/>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item label={'开始评审日期'} key={'reviewDate'} name={'reviewDate'}
                                               initialValue={time.toLocaleDateString()}>
                                        <Input disabled={true}/>
                                    </Form.Item>
                                </Col>
                                <Col span={12} key={'suggestion'}>
                                    <Form.Item label={'评审建议'} key={'suggestion'} name={'suggestion'}
                                               initialValue={suggestion}>
                                        <Input.TextArea disabled={true} value={'suggestion'}/>
                                    </Form.Item>
                                </Col>
                                <Col span={12} key={'handlerresponse'}>
                                    <Form.Item label={'运营反馈'} key={'handlerresponse'} name={'handlerresponse'}
                                               rules={[{required: true, message: '请填写运营反馈!'}]}>
                                        <Input.TextArea key={'handlerresponse'}/>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>
            }
        </Consumer>
    )
}

export default ConfirmOperation