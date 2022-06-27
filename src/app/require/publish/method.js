import {get} from "../../../utils/rest";
import moment from "moment";
import {baseInfo} from "../../../config/require/require-info";

const getTaskTypeSelect = (taskType) => {
    let select = [];
    for (let i = 0; i < taskType.length; i++) {
        let obj = {};
        let type = taskType[i];
        obj.code = type.key;
        obj.value = type.name;
        select.push(obj);
    }
    return select;
}

/*获取需求详情信息*/
const getPublishInfo = async (reqId) => {
    let data = {};
    await get(`/require/getRequireInfo/` + reqId).then(res => {
        data = res.data.value;
    });
    return data;
}


/*获取参数*/
const getParam = (reqType, taskType, data) => {
    let param = {};
    let basic;
    let diff;
    let baseName = getBaseColumns(reqType).map(item => item.name);
    let diffName = formDiffColumns(reqType, taskType).map(item => item.name);
    basic = formParam(baseName, data);
    diff = formParam(diffName, data);
    basic.deadline = basic.deadline ? moment(basic.deadline).format('YYYY-MM-DD') : '';
    basic.reqType = reqType;
    param.basic = basic;
    param.diff = diff;
    return param;
}

/*生成对应值*/
const formParam = (array, data) => {
    let param = {}
    for (let i = 0; i < array.length; i++) {
        let name = array[i];
        param[name] = data[name]
    }
    return param;
}


/*获取详情字段*/
const getColumns = (reqType, taskType) => {
    let columns;
    let diffColumns = [];
    taskType = taskType ? taskType : 'TZ';
    let baseColumns = getBaseColumns(reqType);
    if (reqType === '其他') {
        columns = baseColumns;
    } else {
        diffColumns = formDiffColumns(reqType, taskType);
        columns = [...baseColumns, ...diffColumns];
    }
    return columns;
}

/*获取基础字段*/
const getBaseColumns = (reqType) => {
    let columns;
    switch (reqType) {
        case '日常运营':
            columns = baseInfo;
            break;
        case '系统任务':
            columns = baseInfo;
            break;
        default:
            columns = baseInfo.filter(item => item.name !== 'taskType');
            break;
    }
    return columns;
}


/*构建差异性字段*/
const formDiffColumns = (reqType, taskType) => {
    let confType;
    let diffColumns = [];
    taskType = taskType ? taskType : 'TZ';
    switch (reqType) {
        case '日常运营':
            confType = taskType;
            break;
        case '客户POC':
            confType = 'POC';
            break;
        case '专项任务':
            confType = 'SPECIAL';
            break;
        case '问题排查':
            confType = 'CHECK';
            break;
        case '系统任务':
            confType = taskType;
            break;
        default:
            break;
    }
    if (confType) {
        diffColumns = getDiffColumns(confType);
    }
    return diffColumns;
}

/*获取差异性字段*/
const getDiffColumns = (confType) => {
    let array = JSON.parse(sessionStorage.getItem('columns'));
    let columns = array.filter(item => confType.indexOf(item.confType) > -1);
    let diffColumns = [];
    for (let i = 0; i < columns.length; i++) {
        let item = columns[i];
        let obj = {};
        obj.name = item.fieldName;
        obj.label = item.fieldComment;
        obj.type = item.fieldType;
        if (item.necessary === 'True') {
            obj.rules = [{required: true, message: '请输入' + item.name + '!'}];
        }
        if (item.placeholder) {
            obj.placeholder = item.placeholder;
        }
        if (item.codeType) {
            let select = []
            let array = item.codeType.split(';');
            for (let i = 0; i < array.length; i++) {
                let object = JSON.parse(array[i]);
                select.push(object)
            }
            obj.select = select;
        }
        diffColumns.push(obj)
    }
    return diffColumns;
}


export {getTaskTypeSelect, getPublishInfo, getParam, getColumns, getBaseColumns, getDiffColumns}