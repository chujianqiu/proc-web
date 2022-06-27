import React from "react";
import Login from "../common/login";
import Home from "../common/home";
import {Route, Redirect} from "react-router-dom";
import ProContent from "../componet/content";
import {useStore} from "../store/useStore";

/*路由守卫*/
const RouterGuard = (props) => {
    const {location} = props;
    const {pathname, state} = location;
    if (pathname === '/') {
        return <Redirect to='/login' path={'/login'} component={Login}/>
    }
    if (pathname === '/login') {
        return <Route path={'/login'} component={Login}/>
    }

    if (!state) {
        return <Redirect to='/login' path={'/login'} component={Login}/>
    }
    return (
        <Home exact path={'/home'} key={'home'} component={Home}>
            <Route path={'/home'} key={'homepage'} component={ProContent}/>
            {GetRouteList()}
        </Home>
    )
}

const GetRouteList = () => {
    const authStore = useStore().store.authStore;
    let array = authStore.getMenu() ? authStore.getMenu() : [];
    const menu = getRoute([], array);
    return menu.map(item => {
        let {id, url} = item;
        return (<Route exact path={url} key={id} component={ProContent}/>)
    })
}

const getRoute = (array, menu) => {
    menu.forEach(item => {
        if (item.path) {
            array.push(item);
        }
        if (item.children.length > 0) {
            getRoute(array, item.children);
        }
    })
    return array;
}

export default RouterGuard


