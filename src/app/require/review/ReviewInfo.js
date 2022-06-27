import {get, post} from "../../../utils/rest";
import React, {useEffect, useState} from "react";
import {Button, Form, Input, message, Select} from "antd";
import {Consumer} from "../../../componet/modal/openModal";

const Option = Select;
const ReviewInfo = (props) => {
    const {reqId, reqTopic} = props;
    const [form] = Form.useForm();

    const layout = {labelCol: {span: 4}, wrapperCol: {span: 10}};

    const [userName, setUserName] = useState([]);

    useEffect(() => {
        get(`/require/getHanderUser`).then(res => {
            setUserName(res.data.data);
        })
    }, [])
    
    /*通知*/
    const notice = (operation) => {
        let handlerUser = form.getFieldValue('handlerUser');
        let suggestion = form.getFieldValue('reviewSuggestion');
        post(`/require/notice`, {reqId: reqId, handlerUser: handlerUser, suggestion: suggestion}).then(res => {
            if (res.data.code === 200) {
                message.success(reqTopic + `审批通过`);
                quitInfo(operation);
            } else {
                message.success(reqTopic + `审批不通过`);
            }
        })
    }

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
                        <Form {...layout} layout={'horizontal'} form={form}>
                            <Form.Item label={'通知负责人'} key={'handlerUserName'} name={'handlerUserName'}
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
                            <Form.Item label={'评审建议'} key={'reviewSuggestion'} name={'reviewSuggestion'}
                                       rules={[{required: true, message: '请填写评审建议!'}]}>
                                <Input.TextArea key={'reviewSuggestion'}/>
                            </Form.Item>
                        </Form>
                        <div className={'button-group'}>
                            <Button className={'bottom-button'} type={'primary'}
                                    onClick={() => notice(operation)}>通知</Button>
                            <Button className={'bottom-button'} type={'default'}
                                    onClick={() => refuse(operation)}>拒收</Button>
                            <Button className={'bottom-button'} type={'default'}
                                    onClick={() => quitInfo(operation)}>退出</Button>
                        </div>
                    </div>
            }
        </Consumer>

    )
}

export default ReviewInfo