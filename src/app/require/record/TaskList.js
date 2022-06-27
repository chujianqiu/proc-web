import React from "react";
import DataTable from "../../../componet/datatable";
import {taskList} from "../../../config/task/task-list";
const TaskList = () =>{
    return(<DataTable columns={taskList}></DataTable>)
}

export default TaskList;