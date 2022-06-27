import React from "react";
import {get} from "../../../utils/rest";
import {UploadOutlined} from "@ant-design/icons";
import {Button, Form, message, Radio, Upload} from "antd";
import {Consumer} from "../../../componet/modal/openModal";

const FinishInfo = (props) => {
    const [form] = Form.useForm();
    const layout = {
        labelCol: {span: 4},
        wrapperCol: {span: 8}
    }

    const quit = (operation) => {
        operation.close();
    }

    const confirm = (operation) => {
        get(`/requirement/finishRequirement.do`, {userid: props.userid, reqid: props.reqid}).then(res => {
            if (res.data.msg === 'success') {
                message.success(`执行成功!`);
                quit(operation);
            }
        })
    }

    return (
        <Consumer>
            {
                (operation) =>
                    <div>
                        <Form {...layout} layout={'horizontal'} form={form}>
                            <Form.Item label={'是否有文件提交'} key={'handlerUserName'} name={'handlerUserName'}>
                                <Radio.Group defaultValue={'Y'}>
                                    <Radio value={'Y'}>有</Radio>
                                    <Radio value={'N'}>没有</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item label={'附件'} key={'file'} name={'file'}>
                                <Upload>
                                    <Button icon={<UploadOutlined/>} type={"default"}>上传</Button>
                                </Upload>
                            </Form.Item>
                        </Form>
                        <div className={'button-group'}>
                            <Button className={'bottom-button'} type={'primary'}
                                    onClick={() => quit(operation)}>确认</Button>
                            <Button className={'bottom-button'} type={'default'}
                                    onClick={() => confirm(operation)}>退出</Button>
                        </div>
                    </div>
            }
        </Consumer>

    )
}

export default FinishInfo;