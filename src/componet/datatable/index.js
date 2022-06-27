import React, {forwardRef, useImperativeHandle, useRef} from "react";
import TableContent from "./TableContent";
import ProSearch from "../search";
import './style.css';
import moment from "moment";

/*列表组件*/
const DataTable = forwardRef((props, ref) => {
    const {param,button,url,primaryKey,columns,search} = props;
    const searchRef = useRef();
    const tableRef = useRef();

    useImperativeHandle(ref, () => ({
        getSelectedRow: () => _getSelectedRow(),
        refresh: () => _refresh()
    }))

    /*获取当前选中行*/
    const _getSelectedRow = () => {
        return tableRef.current.getSelectedRow();
    }

    /*刷新*/
    const _refresh = () => {
        tableRef.current.refresh();
    }

    /*搜索功能*/
    const onSearch = () => {
        if (searchRef.current) {
            let data = searchRef.current.getData();
            if (data.publishtime) {
                data.publishtime = moment(data.publishtime).format('YYYY-MM-DD');
            }
            let newParam = {
                ...param, ...data
            }
            tableRef.current.updateParam(newParam);
            tableRef.current.refresh();
        }
    }

    /*重置功能*/
    const reset = () => {
        if (searchRef.current) {
            searchRef.current.refresh();
            tableRef.current.updateParam(props.param);
            tableRef.current.refresh();
        }
    }

    return (
        <div>
            {search ? <ProSearch columns={props.search} search={() => onSearch()} reset={() => reset()} ref={searchRef}/> : null}
            <TableContent
                param={param}
                ref={tableRef}
                search={false}
                url={url}
                button={button}
                primaryKey={primaryKey}
                columns={columns}
            />
        </div>
    )
})

export default DataTable