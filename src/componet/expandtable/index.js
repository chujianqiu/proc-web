import React, {forwardRef, useImperativeHandle} from "react";
import {Table} from "antd";
import ProTable from "@ant-design/pro-table";
import {get} from "../../utils/rest";
/*嵌套表格*/
const ExpandTable = forwardRef((props,ref)=>{
    const {columns,url,param} = props;
    useImperativeHandle(ref,()=>({

    }))

    /*获取数据*/
    const _getData = () => {
        return Promise.resolve({data: [], success: true})
    }
    return(
        <ProTable
            request={() => _getData()}
            search={false}
            columns={columns}
        />
    )
})


const ChildTable = () =>{
    return(
        <Table showHeader={false}/>
    )
}


export default ExpandTable