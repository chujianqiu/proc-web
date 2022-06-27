import ProTable from "@ant-design/pro-table";
import {Button} from "antd";
import React from "react";
import '../datatable/style.css';
import {get} from "../../utils/rest";

/*列表组件*/
export default class SimpleTable extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.url = props.url;
        this.param = props.param;
        this.primaryKey = props.primaryKey;
        this.buttuon = props.button;
        this.state = {row: '', rowId: ''}
        if (props.instance) {
            props.instance(this)
        }
    }

    /*获取选中行*/
    getSelectedRow = () => {
        return this.state.row;
    }

    /*获取页数*/
    getPagination = () => {
        return this.state.page;
    }

    /*刷新操作*/
    refresh = () => {
        this.ref.reload();
    }

    /*获取数据*/
    _getData = (params) => {
        return get(this.url, this.param).then(res => {
            let value = res.data.value;
            let data = value.length ? value : value.list;
            if (value.list) {
                this.setState({
                    total: value.page.totalcount
                })
            }
            let result = {data: this.props.search ? this._filter(params, data) : data, success: true};
            return result;
        })
    }

    /*点击操作*/
    _click = (record) => {
        let id = record[this.primaryKey];
        return {
            onClick: () => {
                this.setState({rowId: id, row: record})
            }
        };
    }

    /*对选中行渲染*/
    _setRowClassName = (record) => {
        let id = record[this.primaryKey];
        return id === this.state.rowId ? 'selected-row' : '';
    }

    /*获取rowKey*/
    _getRowKey = (primaryKey, record) => {
        return !primaryKey || !record.hasOwnProperty(primaryKey) ? null : record[primaryKey];
    }

    /*前端数据筛选*/
    _filter = (params, data) => {
        delete params.current;
        delete params.pageSize;
        for (let obj in params) {
            let value = params[obj].trim();
            if (value && value !== 'all') {
                data = data.filter(item => item[obj].indexOf(value) !== -1);
            }
        }
        return data;
    }

    render() {
        return (
            <ProTable
                columns={this.props.columns}
                request={
                    (params, sort, filter) => this._getData(params)
                }
                actionRef={(ref) => (this.ref = ref)}
                rowKey={record => this._getRowKey(this.primaryKey, record)}
                pagination={{showQuickJumper: true, defaultPageSize: 10}}
                search={this.props.search ? {layout: 'vertical', defaultCollapsed: true} : false}
                dateFormatter="string"
                toolBarRender={() => [this.buttuon ? this.buttuon.map((item, i) => {
                    return (<Button key={i} type={item.type} onClick={item.onclick ? item.onclick() : () => {
                    }} danger={item.danger}>{item.name}</Button>)
                }) : '']}
                onRow={this._click}
                rowClassName={this._setRowClassName}
            ></ProTable>
        )
    }
}
