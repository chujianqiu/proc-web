//在查询未做成可配置化之前，信息存储在这里
const requireSearch = [
    {
        name: 'datasourcetype', label: '数据类型', type: 'select',
        select: [
            {code: '诉讼', value: '诉讼'}, {code: '税务', value: '税务'}, {code: '环保', value: '环保'}, {code: '舆情', value: '舆情'},
            {code: '行政处罚', value: '行政处罚'}, {code: '招投标', value: '招投标'}, {code: '其他', value: '其他'}
        ]
    },
    {name: 'reqtopic', label: '需求主题', type: 'input'},
    {
        name: 'tasktype', label: '任务类型', type: 'select',
        select: [
            {code: 'TZ', value: '拓展'}, {code: 'XZ', value: '下载'}, {code: 'CL', value: '处理'}, {
                code: 'TZ,XZ',
                value: '拓展，下载'
            },
            {code: 'XZ,CL', value: '下载，处理'}, {code: 'TZ,XZ,CL', value: '拓展，下载，处理'}, {code: 'POC', value: '客户POC'},
            {code: 'SPECIAL', value: '专项任务'}, {code: 'CHECK', value: '问题排查'}, {
                code: 'SYSTEM',
                value: '系统任务'
            }, {code: 'OTHERS', value: '其他'}
        ]
    },
    {name: 'publishtime', label: '发布日期', type: 'datePicker'},
    {
        name: 'status', label: '需求状态', type: 'select',
        select: [
            {code: '1', value: '待发布'}, {code: '2', value: '待评审'}, {code: '3', value: '待确认'},
            {code: '4', value: '未通过'}, {code: '5', value: '待执行'}, {code: '6', value: '执行中'},
            {code: '8', value: '终止'}, {code: '7', value: '已完成'}, {code: '9', value: '暂停'},
        ]
    },
]

const recordSearch = [
    {name: 'reqtopic', label: '需求主题', type: 'input'},
    {
        name: 'reqtype', label: '需求类型', type: 'select',
        select: [{code: '日常运营', value: '日常运营'}, {code: '客户POC', value: '客户POC'}, {code: '专项任务', value: '专项任务'},
            {code: '问题排查', value: '问题排查'}, {code: '系统任务', value: '系统任务'}, {code: '其他', value: '其他'}]
    },
    {
        name: 'status', label: '需求状态', type: 'select',
        select: [
            {code: '1', value: '待发布'}, {code: '2', value: '待评审'}, {code: '3', value: '待确认'},
            {code: '4', value: '未通过'}, {code: '5', value: '待执行'}, {code: '6', value: '执行中'},
            {code: '8', value: '终止'}, {code: '7', value: '已完成'}, {code: '9', value: '暂停'},
        ]
    },
    {
        name: 'tasktype', label: '任务类型', type: 'select',
        select: [
            {code: 'TZ', value: '拓展'}, {code: 'XZ', value: '下载'}, {code: 'CL', value: '处理'}, {
                code: 'TZ,XZ',
                value: '拓展，下载'
            },
            {code: 'XZ,CL', value: '下载，处理'}, {code: 'TZ,XZ,CL', value: '拓展，下载，处理'}, {code: 'POC', value: '客户POC'},
            {code: 'SPECIAL', value: '专项任务'}, {code: 'CHECK', value: '问题排查'}, {
                code: 'SYSTEM',
                value: '系统任务'
            }, {code: 'OTHERS', value: '其他'}
        ]
    },
    {name: 'user', label: '需求人', type: 'input'},
    {name: 'publishtime', label: '发布日期', type: 'datePicker'},
    {
        name: 'datasourcetype', label: '数据类型', type: 'select',
        select: [
            {code: '诉讼', value: '诉讼'}, {code: '税务', value: '税务'}, {code: '环保', value: '环保'}, {code: '舆情', value: '舆情'},
            {code: '行政处罚', value: '行政处罚'}, {code: '招投标', value: '招投标'}, {code: '其他', value: '其他'}
        ]
    }
]
const taskSearch = [
    {name: 'main_id', label: '任务编号', type: 'input'},
    {
        name: 'tz_type', label: '拓展方式', type: 'select',
        select: [
            {code: '1', value: '自动拓展'}, {code: '2', value: '人工拓展'}, {code: '3', value: '外部采购'},
        ]
    },
    {
        name: 'datasource_type', label: '数据类型', type: 'select',
        select: [
            {code: '1', value: '诉讼'}, {code: '2', value: '税务'}, {code: '3', value: '环保'},
            {code: '4', value: '舆情'}, {code: '5', value: '行政处罚'}, {code: '6', value: '招投标'},
        ]
    },
    {
        name: 'task_priority', label: '任务优先级', type: 'select',
        select: [
            {code: '1', value: '加急'}, {code: '2', value: '高'}, {code: '3', value: '中'},
            {code: '4', value: '低'}
        ]
    },
    {name: 'task_deadline', label: '完成期限', type: 'datePicker'},
    {
        name: 'progress', label: '执行进度', type: 'select',
        select: [
            {code: '1', value: '待执行'}, {code: '2', value: '带复核'}, {code: '3', value: '待质检'},
            {code: '4', value: '完成'}
        ]
    },
    {name: 'handler_user', label: '执行人员', type: 'input'},
    {
        name: 'status', label: '任务状态', type: 'select',
        select: [
            {code: '1', value: '执行中'}, {code: '2', value: '完成'}, {code: '3', value: '持续性'},
            {code: '4', value: '暂停'}, {code: '5', value: '终止'}, {code: '6', value: '失效'},
        ]
    },
]


export {
    requireSearch, recordSearch, taskSearch
}