import React from 'react';
import LayoutFrame from "./LayoutFrame";
import {withRouter} from 'react-router-dom';
import {observer} from "mobx-react";
import {useStore} from "../../store/useStore";

/*首页*/
const Home = observer((props) => {
    const authStore = useStore().store.authStore;
    const user = authStore.getUser();
    const menu = authStore.getMenu();
    const columns = JSON.parse(sessionStorage.getItem('columns'));
    const param = {columns: columns, menu: menu, user: user};
    return (
        <LayoutFrame content={props.children} history={props.history} param={param}/>
    )
})

export default withRouter(Home)
