import React, {forwardRef, useImperativeHandle, useState} from "react";
import ProTable from "@ant-design/pro-table";
import {get} from "../../utils/rest";
import {Button} from "antd";
import './style.css';

/*列表内容组件*/
const TableContent = forwardRef((props, ref) => {
    let {primaryKey, button, url, columns} = props;
    const [row, setRow] = useState(null);
    const [total, setTotal] = useState(1);
    const [param, setParam] = useState(props.param);
    const table = {};

    useImperativeHandle(ref, () => ({
        getSelectedRow: () => row,
        refresh: () => _refresh(),
        updateParam: (param) => _updateParam(param)
    }))

    /*获取数据*/
    const _getData = () => {
        if (url) {
            return get(url, param).then(res => {
                if (res) {
                    let value = res.data.data;
                    setTotal(value.total);
                    return {data: value.list, success: true}
                }
                return {data: [], success: false}
            })
        }
        return Promise.resolve({data: [], success: true})
    }

    /*刷新操作*/
    const _refresh = () => {
        table.current.reload();
    }

    /*更新参数*/
    const _updateParam = (param) => {
        setParam(param);
    }

    /*页面跳转*/
    const _pageJumper = (page) => {
        let newParam = {
            ...param
        }
        newParam.pageno = page;
        setParam(newParam);
    }

    /*获取rowKey*/
    const _getRowKey = (primaryKey, record) => {
        return !primaryKey || !record.hasOwnProperty(primaryKey) ? null : record[primaryKey];
    }

    /*点击操作*/
    const _click = (record) => {
        return {
            onClick: () => {
                setRow(record)
            }
        };
    }

    const _setRowClassName = (record) => {
        return row && record.reqId === row.reqId ? 'selectRow' : ''
    }

    return (
        <ProTable
            bordered={true}
            columns={columns}
            request={
                () => _getData()
            }
            actionRef={table}
            rowKey={record => _getRowKey(primaryKey, record)}
            pagination={{
                showQuickJumper: false,
                defaultPageSize: 10,
                total: total,
                onChange: (page, pageSize) => _pageJumper(page, pageSize)
            }}
            search={false}
            dateFormatter="string"
            toolBarRender={
                () => [button ? button.map((item, i) => {
                    return (
                        <Button
                            key={i}
                            type={item.type}
                            onClick={
                                item.onclick ? item.onclick() : () => {
                                }
                            }
                            danger={item.danger}>
                            {item.name}
                        </Button>
                    )
                }) : '']}
            onRow={_click}
            rowClassName={_setRowClassName}
        />
    )
})

export default TableContent


