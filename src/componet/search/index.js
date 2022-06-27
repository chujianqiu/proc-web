import React, {createElement, forwardRef, useImperativeHandle} from "react";
import {DatePicker, Form, Input, Radio, Select, Row, Col, Button} from "antd";
import './style.css';

const Option = Select.Option, create = createElement;
/*查询组件*/
const ProSearch = forwardRef((props, ref) => {
    const columns = props.columns;
    const [form] = Form.useForm();

    useImperativeHandle(ref, () => ({
        getForm: () => form,
        getData: () => _getDataInfo(),
        refresh: () => _refresh()
    }))

    /*获取form表单数据*/
    const _getDataInfo = () => {
        return form.getFieldsValue();
    }

    /*搜索框格式调整*/
    const _changeStyle = (size) => {
        let content = null;
        switch (size) {
            case 5:
                content = (<div className={'empty-content-short'}></div>);
                break;
            case 8:
                content = (<div className={'empty-content-long'}></div>);
                break;
            case 9:
                content = (<div className={'empty-content-short'}></div>);
                break;
            default:
                break;
        }
        return content;
    }

    /*重置表单*/
    const _refresh = () => {
        form.resetFields();
    }

    /*视图*/
    const components = {
        /*输入框*/
        input: ({name, placeholder}) => (<Input key={name} placeholder={placeholder}/>),
        /*日期选择*/
        datePicker: ({label}) => <DatePicker placeholder={label} format="YYYY-MM-DD"/>,
        /*多选框*/
        select: ({
                     label, defaultValue, select = [], callback = () => {
            }
                 }) => create(
            Select, {
                defaultValue: defaultValue, placeholder: label, onChange: e => callback(e)
            },
            select.map(item => create(Option, {key: item.code, value: item.code}, item.value))),
        /*单选框*/
        radio: ({
                    defaultValue, select = [], callback = () => {
            }
                }) => create(Radio.Group, {value: defaultValue, onChange: e => callback(e)},
            select.map(item => create(Radio, {key: item.code, value: item.code}, item.value))),
    }
    return (
        <div>
            <Form form={form}>
                <Row className={'search'} span={24}>
                    {
                        columns.map((item, i) => {
                            const {type = 'input'} = item, Component = components[type]
                            return (
                                <Col span={6} key={i}>
                                    <Form.Item className={'search-column'} label={item.label} key={item.name}
                                               name={item.name} rules={item.rules}>
                                        {Component(item)}
                                    </Form.Item>
                                </Col>
                            )
                        })
                    }
                    {
                        _changeStyle(columns.length)
                    }
                    <Col span={6} key={'search'} className={'search-button-group'}>
                        <Button type={'default'} className={'search-button'} onClick={() => props.reset()}>重置</Button>
                        <Button type={'primary'} className={'search-button'} onClick={() => props.search()}>查询</Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
})

export default ProSearch;