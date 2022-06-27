import React, {createElement, useEffect, useImperativeHandle, useState} from "react";
import {Col, DatePicker, Form, Input, Row, Select, Radio} from "antd";
import ProUpload from "../upload";
import ProDownLoad from "../download";
import $ from "jquery";
import {Scrollbars} from 'react-custom-scrollbars';

/*info函数组件*/
const FormItem = Form.Item, Option = Select.Option, create = createElement, {Password, TextArea} = Input;
const DataInfo = React.forwardRef((props, ref) => {
    /*获取表单对象*/
    const [form] = Form.useForm();

    /*获取主键值*/
    let {key} = props;

    /*获取表单参数*/
    let [param, setParam] = useState(props.param);

    /*获取字段值*/
    let [columns, setColumns] = useState(props.columns);

    /*获取只读状态*/
    let readStatus = props.readOnly;

    /*获取文件信息*/
    let file = param ? param.files : [];

    /*生成表单数据*/
    let data = formData(columns, param);

    /*获取用户信息*/
    let userId = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')).userId : '';

    useImperativeHandle(ref, () => ({
        /*获取表单对象*/
        getForm: () => form,
        /*获取表单数据*/
        getData: () => _getDataInfo(),
        /*获取表单某一字段值*/
        getValue: name => _getValue(name),
        /*给表单某一字段赋值*/
        setValue: value => _setValue(value),
        /*给表单赋值*/
        setData: data => _setData(data),
        /*给表单赋予参数*/
        setParam: param => _setParam(param),
        /*校验表单必输项*/
        vaildValue: () => _vaildValue(),
        /*设置表单字段*/
        setColumns: (newColumns) => _setColumns(newColumns),
        /*设置字段信息*/
        setFields: fields => _setFields(fields),
        /*设置只读*/
        setReadOnly: (name, readOnly) => _setReadOnly(name, readOnly)
    }))

    /*表单回显*/
    useEffect(() => {
        form.resetFields(data);
    }, [data, form]);

    /*定义视图*/
    const components = {
        /*输入框*/
        input: ({name, placeholder, readOnly}) => <Input key={name} placeholder={placeholder}
                                                         disabled={readOnly || readStatus}/>,
        /*文本域*/
        textArea: ({name, placeholder}) => <TextArea key={name} placeholder={placeholder} disabled={readStatus}/>,
        /*密码*/
        password: ({label}) => create(Password, {placeholder: label}),
        /*日期选择*/
        datePicker: ({label}) => <DatePicker placeholder={label} format='YYYY-MM-DD' disabled={readStatus}/>,
        /*多选框*/
        select: ({
                     label, defaultValue, select = [], callback = () => {
            }
                 }) =>
            create(Select, {
                    defaultValue: defaultValue,
                    placeholder: label,
                    disabled: readStatus,
                    onChange: e => callback(e)
                },
                select.map(item => create(Option, {key: item.code, value: item.code}, item.value))),
        /*单选框*/
        radio: ({
                    defaultValue, select = [], callback = () => {
            }
                }) =>
            create(Radio.Group, {value: defaultValue, disabled: readStatus, onChange: e => callback(e)},
                select.map(item => create(Radio, {key: item.code, value: item.code}, item.value))),
        /*上传*/
        upload: () => (<ProUpload readOnly={readStatus} param={_getFileParam()} file={file ? file : []}/>),
        /*下载*/
        download: () => (<ProDownLoad file={file ? file : []}/>)
    }

    /*获取form表单数据*/
    const _getDataInfo = () => {
        return form.getFieldsValue();
    }

    /*设置form某一项的值*/
    const _setValue = (value) => {
        form.setFieldsValue(value);
    }

    /*校验form表单数据*/
    const _vaildValue = () => {
        return form.validateFields();
    }

    /*改变字段*/
    const _setColumns = (newColumns) => {
        setColumns(newColumns);
    }

    /*设置字段信息*/
    const _setFields = (fields) => {
        form.setFields(fields);
    }

    /*改变字段值*/
    const _setData = (data) => {
        data = formData(columns, data);
        form.resetFields(data);
    }

    const _setParam = (param) => {
        setParam(param);
    }

    /*获取字段值*/
    const _getValue = (name) => {
        form.getFieldValue(name);
    }

    /*获取文件参数*/
    const _getFileParam = () => {
        return {key: key, user: userId};
    }

    /*设置字段只读*/
    const _setReadOnly = (name, readOnly) => {
        $('#' + name).attr('disabled', readOnly);
    }

    return (
        <Scrollbars style={{height: 550}}>
            <Form form={form} fields={data}>
                <Row span={24}>
                    {
                        columns.map((item, i) => {
                            const {type = 'input'} = item, Component = components[type];
                            let size = item.type === 'textArea' ? 16 : 8
                            return (
                                <Col span={size} key={i}>
                                    <FormItem label={item.label} key={item.name} name={item.name} rules={item.rules}
                                              hidden={item.hidden}>
                                        {Component(item)}
                                    </FormItem>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Form>
        </Scrollbars>
    )
})

/*转化数据类型*/
const formData = (columns, param) => {
    let array = [];
    if (param) {
        columns.map(item => {
            let obj = {};
            obj.name = [item.name];
            for (let key in param) {
                if (key === item.name) obj.value = param[key];
            }
            return array.push(obj);
        })
    }
    return array;
}

export default DataInfo