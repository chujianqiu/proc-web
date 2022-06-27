import React from "react";
import DataInfo from "../../componet/datainfo";
import {roleInfo} from "../../config/user/user-info";
//角色详情
const RoleInfo = () => {
    return(
        <div>
            <DataInfo columns={roleInfo}/>
        </div>
    )
}

export default RoleInfo