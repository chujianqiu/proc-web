import {observable, action, makeObservable} from "mobx";

export class AuthStore {
    user = {};
    menu = [];
    button = [];

    constructor() {
        makeObservable(this, {
            user: observable,
            getUser: action,
            setUser: action,

            menu: observable,
            getMenu: action,
            setMenu: action,

            button: observable,
            getButton: action,
            setButton: action
        })
    }

    getUser() {
        return this.user ? JSON.parse(sessionStorage.getItem('user')) : '';
    }

    setUser(value) {
        this.user = value ? value : '';
        sessionStorage.setItem('user', JSON.stringify(this.user))
    }

    getMenu() {
        return this.menu ? JSON.parse(sessionStorage.getItem('menu')) : '';
    }

    setMenu(value) {
        this.menu = value ? value : '';
        sessionStorage.setItem('menu', JSON.stringify(this.menu));
    }

    getButton() {
        return this.button ? JSON.parse(sessionStorage.getItem('button')) : '';
    }

    setButton(value) {
        this.button = value ? value : '';
        sessionStorage.setItem('button',JSON.stringify(this.button));
    }
}