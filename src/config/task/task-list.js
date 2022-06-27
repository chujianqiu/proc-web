//在列表页未做成可配置化之前，页面信息存储在这里
const taskList = [
    {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        valueType: 'indexBorder'
    },
    {
        title: '需求编号',
        dataIndex: 'reqId',
        key: 'reqId'
    },
    {
        title: '需求主题',
        dataIndex: 'reqTopic',
        key: 'reqTopic'
    },
    {
        title: '紧急程度',
        dataIndex: 'emergent',
        key: 'emergent',
        valueType: 'select',
        valueEnum: {'S': '极高', 'H': '高', 'M': '中', 'L': '低'}
    },
    {
        title: '需求状态',
        dataIndex: 'status',
        key: 'status',
        valueType: 'select',
        valueEnum: {'1': '待发布', '2': '待评审', '3': '待确认', '4': '未通过', '5': '待执行', '6': '执行中', '7': '已完成', '8': '终止', '9': '暂停'},
    },
    {
        title: '完成时限',
        dataIndex: 'deadline',
        key: 'deadline',
        valueType: 'date'
    },
    {
        title: '需求人',
        dataIndex: 'reqUserName',
        key: 'reqUserName'
    },
]

export {
    taskList
}