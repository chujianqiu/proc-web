import React from "react";
import ReactDOM from 'react-dom';
import Modal from "antd/es/modal/Modal";
import ConfigProvider from "antd/lib/config-provider";
import zhCN from "antd/es/locale-provider/zh_CN";

export const {Provider, Consumer} = React.createContext('');
//生成公用模态框(title:模态框标题 componet:模态框内容)
const openModal = (title, componet, reload, width) => {
    let modal = null;
    /*创建模态框元素*/
    const maskDiv = document.createElement('div');
    document.body.appendChild(maskDiv);
    /*关闭模态框*/
    const _close = () => {
        const unmountResult = ReactDOM.unmountComponentAtNode(maskDiv);
        if (unmountResult) {
            maskDiv.parentNode.removeChild(maskDiv);
        }
    };

    /*提交表单*/
    const _submit = () => {
        _close();
    }

    /*React1.7后forwardRef传递ref*/
    const ModelComponet = React.forwardRef((props, ref) => {
        width = width ? width : '60%';
        return (
            <ConfigProvider locale={zhCN}>
                <Modal
                    keyboard={false}
                    visible={true}
                    title={title}
                    width={width}
                    onOk={() => _submit()}
                    onCancel={() => _close()}
                    destroyOnClose={true}
                    maskClosable={false}
                    footer={[]}>
                    <Provider value={{reload: reload, close: _close}}>{componet}</Provider>
                </Modal>
            </ConfigProvider>
        )
    })

    ReactDOM.render(<ModelComponet/>, maskDiv);

    modal = {
        close: _close,
        submit: _submit
    }
    return modal;
}

export default openModal