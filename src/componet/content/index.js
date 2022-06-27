import React from "react";
import Loadable from 'react-loadable';
import ProCard from "@ant-design/pro-card";
import {withRouter} from "react-router-dom";
import NoAccessPage from "../../common/result";
import {useStore} from "../../store/useStore";
import './style.css';

/*内容包装分发组件*/
const ProContent = (props) => {
    const authStore = useStore().store.authStore;
    const {data} = props.location.state;
    const path = data.path ? data.path : 'require/publish/index';
    if(path){

    }
    if (!data['user']) {
        data['user'] = authStore.getUser();
    }
    const Content = getContent(path);
    const menu = authStore.getMenu();

    if (menu.length === 0) {
        return <NoAccessPage/>
    }

    return (
        <ProCard className={'layout-content'}><Content param={data}/></ProCard>
    )
}


const getContent = (path) => {
    const content = Loadable({
        loader: () => import('../../app/' + path),
        loading() {
            return <div></div>
        }
    })
    return content;
}

export default withRouter(ProContent);