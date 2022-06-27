import {AuthStore} from "./authStore";
import {MenuStore} from "./menuStore";

export const store = {
    authStore: new AuthStore(),
    menuStore: new MenuStore()
}
