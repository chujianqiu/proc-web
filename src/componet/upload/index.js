import React, {forwardRef} from "react";
import {Button, message, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";
import {get, upload} from "../../utils/rest";
import {downloadFile} from "../download/download";
/*上传组件*/
const ProUpload = forwardRef((props, ref) => {
    const {readOnly, file} = props;
    const {user, reqID} = props.param;
    const uploadOperation = (options) => {
        let data = new FormData();
        data.append('file', options.file);
        data.append('user', user);
        data.append('reqID', reqID);
        _upload(data).then(res => {
            options.onSuccess(res, options.file);
        })
    }

    const _upload = async (data) => {
        let result = '';
        await upload('/file/upload.do', data).then(res => {
            if (res.data.msg === 'success') {
                result = res.data.value;
            }
        });
        return result;
    }

    const getDefaultFile = () => {
        let defaultFile = [];
        file.forEach(item => {
            let obj = {
                uid: item.file_no,
                name: item.file_name,
                url: item.href
            }
            defaultFile.push(obj)
        })
        return defaultFile;
    }

    const removeFile = (file) => {
        get(`/file/remove.do`, {fileno: file.uid, user: user}).then(res => {
            if (res.data.msg === 'success') {
                message.success('删除成功!');
            }
        })
    }

    const preViewFile = (e) => {
        let fileNo = e.response ? e.response : e.uid;
        downloadFile(fileNo);
    }

    return (
        <>
            <Upload customRequest={options => uploadOperation(options)} defaultFileList={getDefaultFile()}
                    onPreview={e => preViewFile(e)} onRemove={file => removeFile(file)}>
                <Button icon={<UploadOutlined/>} type={"default"} disabled={readOnly}>上传</Button>
            </Upload>
        </>

    )
})

export default ProUpload