import {observable, action, makeObservable} from "mobx";

export class MenuStore {
    openMenu = [];
    selectMenu = [];
    path = '';

    constructor() {
        makeObservable(this, {
            openMenu: observable,
            getOpenMenu: action,
            setOpenMenu: action,

            selectMenu: observable,
            getSelectMenu: action,
            setSelectMenu: action,

            path: observable,
            getPath: action,
            setPath: action
        })
    }

    getOpenMenu() {
        return this.openMenu ? JSON.parse(sessionStorage.getItem('openMenu')) : [];
    }

    setOpenMenu(value) {
        this.openMenu = value ? value : '';
        sessionStorage.setItem('openMenu', JSON.stringify(this.openMenu))
    }

    getSelectMenu() {
        return this.selectMenu ? JSON.parse(sessionStorage.getItem('selectMenu')) : [];
    }

    setSelectMenu(value) {
        this.selectMenu = value ? value : '';
        sessionStorage.setItem('selectMenu', JSON.stringify(this.selectMenu))
    }

    getPath() {
        return this.path ? JSON.parse(sessionStorage.getItem('path')) : '';
    }

    setPath(value) {
        this.path = value ? value : '';
        sessionStorage.setItem('path',JSON.stringify(this.path));
    }

}