import React from "react";
import DataInfo from "../../../componet/datainfo";
import {Col, Divider, Form, Input, Row} from "antd";
import {getColumns} from "../publish/method";
import moment from "moment";

const RecordInfo = (props) => {
    const time = new Date();
    const [form] = Form.useForm();
    let {userName, data, suggestion, response, reqType, taskType} = props;

    if (data && data.deadline) {
        data.deadline = moment(data.deadline, 'YYYY-MM-DD');
    }
    const ref = React.createRef();
    const columns = getColumns(reqType, taskType);

    return (
        <div>
            <DataInfo columns={columns} param={data} readOnly={true} ref={ref}></DataInfo>
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
                        <Form.Item label={'评审建议'} key={'suggestion'} name={'suggestion'} initialValue={suggestion}>
                            <Input.TextArea disabled={true} value={'suggestion'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12} key={'handlerresponse'}>
                        <Form.Item label={'运营反馈'} key={'handlerresponse'} name={'handlerresponse'}
                                   initialValue={response}>
                            <Input.TextArea disabled={true} key={'handlerresponse'}/>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default RecordInfo;