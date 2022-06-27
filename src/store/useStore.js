import React from "react";
import {MobXProviderContext} from "mobx-react";
export const useStore = () => {
    return React.useContext(MobXProviderContext);
}
