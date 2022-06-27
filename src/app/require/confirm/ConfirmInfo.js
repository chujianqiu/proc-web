import React from "react";
import {get} from "../../../utils/rest";
import {Button, Form, Input, message} from "antd";
import {Consumer} from "../../../componet/modal/openModal";

const ConfirmInfo = (props) => {
    const time = new Date();
    const [form] = Form.useForm();
    const {userId, userName, suggestion, reqId, reqTopic} = props;
    const layout = {labelCol: {span: 4}, wrapperCol: {span: 8}}

    /*拒收*/
    const refuse = (operation) => {
        let response = form.getFieldValue('handlerresponse');
        let param = {reqid: reqId, userid: userId, handlerresponse: response};
        get(`/requirement/handlerRefuse.do`, param).then(res => {
            if (res.data.msg === 'success') {
                message.success(reqTopic + `已拒收`);
                quit(operation);
            } else {
                message.error(reqTopic + `拒收失败`);
            }
        })
    }

    /*通知*/
    const notice = (operation) => {
        let response = form.getFieldValue('handlerresponse');
        let param = {reqid: reqId, userid: userId, handlerresponse: response}
        form.validateFields().then(() => {
            get(`/requirement/handlerAccept.do`, param).then(res => {
                if (res.data.msg === 'success') {
                    message.success(reqTopic + `已接收`);
                    quit(operation)
                } else {
                    message.error(reqTopic + `接受失败`);
                }
            })
        })
    }

    /*退出*/
    const quit = (operation) => {
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
                                       initialValue={userName}>
                                <Input key={'handlerUserName'} disabled={true}/>
                            </Form.Item>
                            <Form.Item label={'开始评审日期'} key={'date'} name={'date'}
                                       initialValue={time.toLocaleDateString()}>
                                <Input key={'date'} disabled={true}/>
                            </Form.Item>
                            <Form.Item label={'评审建议'} key={'suggestion'} name={'suggestion'} initialValue={suggestion}>
                                <Input key={'suggestion'} disabled={true}/>
                            </Form.Item>
                            <Form.Item label={'运营反馈'} key={'handlerresponse'} name={'handlerresponse'}
                                       rules={[{required: true, message: '请填写运营反馈!'}]}>
                                <Input.TextArea key={'handlerresponse'}/>
                            </Form.Item>
                        </Form>
                        <div className={'button-group'}>
                            <Button className={'bottom-button'} type={'primary'}
                                    onClick={() => notice(operation)}>接受</Button>
                            <Button className={'bottom-button'} type={'default'}
                                    onClick={() => refuse(operation)}>拒收</Button>
                            <Button className={'bottom-button'} type={'default'}
                                    onClick={() => quit(operation)}>退出</Button>
                        </div>
                    </div>
            }
        </Consumer>

    )
}

export default ConfirmInfo