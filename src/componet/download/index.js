import React from "react";
import {downloadFile} from "./download";

/*下载组件*/
const ProDownLoad = (props) => {
    const {file} = props;
    return (
        file.map(item => {
            let fileNo = item.file_no;
            let fileName = item.file_name;
            return <div key={fileNo} onClick={() => downloadFile(fileNo)}><a>{fileName}</a></div>
        })
    )
}

export default ProDownLoad;