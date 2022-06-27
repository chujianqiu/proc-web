//在列表页未做成可配置化之前，页面信息存储在这里
const unPublishList = [
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
        title: '数据类型',
        dataIndex: 'dataType',
        key: 'dataType',
        valueType: 'select',
        valueEnum: {'诉讼': '诉讼', '税务': '税务', '环保': '环保', '舆情': '舆情', '行政处罚': '行政处罚', '招投标': '招投标', '其他': '其他'},
    },
    {
        title: '需求主题',
        dataIndex: 'reqTopic',
        key: 'reqTopic'
    },
    {
        title: '任务类型',
        dataIndex: 'taskType',
        key: 'taskType',
        valueType: 'select',
        valueEnum: {'TZ': '拓展', 'XZ': '下载', 'CL': '处理', 'TZ,XZ': '拓展，下载', 'XZ,CL': '下载，处理', 'TZ,XZ,CL': '拓展，下载，处理'}
    },
    {
        title: '关联客户',
        dataIndex: 'customer',
        key: 'customer'
    },
    {
        title: '需求人',
        dataIndex: 'reqUserName',
        key: 'reqUserName'
    },
    {
        title: '紧急程度',
        dataIndex: 'emergent',
        key: 'emergent',
        valueType: 'select',
        valueEnum: {'S': '极高', 'H': '高', 'M': '中', 'L': '低'}
    },
    {
        title: '是否受委托',
        dataIndex: 'ifIntrust',
        key: 'ifIntrust',
        valueType: 'select',
        valueEnum: {'Y': '是', 'N': '否'}
    },
    {
        title: '代理人',
        dataIndex: 'intrustName',
        key: 'intrustName'
    },
    {
        title: '完成时限',
        dataIndex: 'deadline',
        key: 'deadline',
        valueType: 'date'
    },
]

const publishList = [
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
        title: '数据类型',
        dataIndex: 'dataType',
        key: 'dataType',
        valueType: 'select',
        valueEnum: {'诉讼': '诉讼', '税务': '税务', '环保': '环保', '舆情': '舆情', '行政处罚': '行政处罚', '招投标': '招投标', '其他': '其他'},
    },
    {
        title: '需求主题',
        dataIndex: 'reqTopic',
        key: 'reqTopic'
    },
    {
        title: '任务类型',
        dataIndex: 'taskType',
        key: 'taskType',
        valueType: 'select',
        valueEnum: {
            'TZ': '拓展', 'XZ': '下载', 'CL': '处理', 'TZ,XZ': '拓展，下载', 'XZ,CL': '下载，处理', 'TZ,XZ,CL': '拓展，下载，处理',
            'POC': '客户POC', 'SPECIAL': '专项任务', 'CHECK': '问题排查', 'SYSTEM': '系统任务', 'OTHERS': '其他'
        }
    },
    {
        title: '关联客户',
        dataIndex: 'customer',
        key: 'customer'
    },
    {
        title: '发布日期',
        dataIndex: 'pubTime',
        key: 'pubTime',
        valueType: 'date'
    },
    {
        title: '需求人',
        dataIndex: 'reqUserName',
        key: 'reqUserName'
    },
    {
        title: '是否受委托',
        dataIndex: 'ifIntrust',
        key: 'ifIntrust',
        valueType: 'select',
        valueEnum: {'Y': '是', 'N': '否'},
    },
    {
        title: '代理人',
        dataIndex: 'intrustName',
        key: 'intrustName'
    },
    {
        title: '紧急程度',
        dataIndex: 'emergent',
        key: 'emergent',
        valueType: 'select',
        valueEnum: {'S': '加急', 'H': '高', 'M': '中', 'L': '低'}
    },
    {
        title: '完成时限',
        dataIndex: 'deadline',
        key: 'deadline',
        valueType: 'date'
    },
    {
        title: '需求状态',
        dataIndex: 'status',
        key: 'status',
        valueType: 'select',
        valueEnum: {'1': '待发布', '2': '待评审', '3': '待确认', '4': '未通过', '5': '待执行', '6': '执行中', '7': '已完成', '8': '终止', '9': '暂停'},
    },
]

const reviewList = [
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
        title: '数据类型',
        dataIndex: 'dataType',
        key: 'dataType',
        valueType: 'select',
        valueEnum: {'诉讼': '诉讼', '税务': '税务', '环保': '环保', '舆情': '舆情', '行政处罚': '行政处罚', '招投标': '招投标', '其他': '其他'},
    },
    {
        title: '需求主题',
        dataIndex: 'reqTopic',
        key: 'reqTopic'
    },
    {
        title: '任务类型',
        dataIndex: 'taskType',
        key: 'taskType',
        valueType: 'select',
        valueEnum: {
            'TZ': '拓展', 'XZ': '下载', 'CL': '处理', 'TZ,XZ': '拓展，下载', 'XZ,CL': '下载，处理', 'TZ,XZ,CL': '拓展，下载，处理',
            'POC': '客户POC', 'SPECIAL': '专项任务', 'CHECK': '问题排查', 'SYSTEM': '系统任务', 'OTHERS': '其他'
        }
    },
    {
        title: '关联客户',
        dataIndex: 'customer',
        key: 'customer'
    },
    {
        title: '发布日期',
        dataIndex: 'pubTime',
        key: 'pubTime',
        valueType: 'date'
    },
    {
        title: '需求人',
        dataIndex: 'reqUserName',
        key: 'reqUserName'
    },
    {
        title: '是否代理',
        dataIndex: 'IfIntrust',
        key: 'IfIntrust',
        valueType: 'select',
        valueEnum: {'Y': '是', 'N': '否'},
    },
    {
        title: '代理人',
        dataIndex: 'intrustName',
        key: 'intrustName'
    },
    {
        title: '要求完成时间',
        dataIndex: 'deadline',
        key: 'deadline',
        valueType: 'date'
    },
    {
        title: '评审人',
        dataIndex: 'reviewUserName',
        key: 'reviewUserName'
    }
]

const confirmList = [
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
        title: '数据类型',
        dataIndex: 'dataType',
        key: 'dataType',
        valueType: 'select',
        valueEnum: {'诉讼': '诉讼', '税务': '税务', '环保': '环保', '舆情': '舆情', '行政处罚': '行政处罚', '招投标': '招投标', '其他': '其他'},
    },
    {
        title: '需求主题',
        dataIndex: 'reqTopic',
        key: 'reqTopic'
    },
    {
        title: '任务类型',
        dataIndex: 'taskType',
        key: 'taskType',
        valueType: 'select',
        valueEnum: {
            'TZ': '拓展', 'XZ': '下载', 'CL': '处理', 'TZ,XZ': '拓展，下载', 'XZ,CL': '下载，处理', 'TZ,XZ,CL': '拓展，下载，处理',
            'POC': '客户POC', 'SPECIAL': '专项任务', 'CHECK': '问题排查', 'SYSTEM': '系统任务', 'OTHERS': '其他'
        }
    },
    {
        title: '关联客户',
        dataIndex: 'customer',
        key: 'customer'
    },
    {
        title: '发布日期',
        dataIndex: 'pubTime',
        key: 'pubTime',
        valueType: 'date'
    },
    {
        title: '需求人',
        dataIndex: 'reqUserName',
        key: 'reqUserName'
    },
    {
        title: '紧急程度',
        dataIndex: 'emergent',
        key: 'emergent',
        valueType: 'select',
        valueEnum: {'S': '加急', 'H': '高', 'M': '中', 'L': '低'}
    },
    {
        title: '是否受委托',
        dataIndex: 'ifIntrust',
        key: 'ifIntrust',
        valueType: 'select',
        valueEnum: {'Y': '是', 'N': '否'},
    },
    {
        title: '委托人',
        dataIndex: 'intrustName',
        key: 'intrustName'
    },
    {
        title: '要求完成时间',
        dataIndex: 'deadline',
        key: 'deadline',
        valueType: 'date'
    },
    {
        title: '评审人',
        dataIndex: 'reviewUserName',
        key: 'reviewUserName'
    },
    {
        title: '需求状态',
        dataIndex: 'status',
        key: 'status',
        valueType: 'select',
        valueEnum: {
            '1': '待发布',
            '2': '待评审',
            '3': '待确认',
            '4': '未通过',
            '5': '待执行',
            '6': '执行中',
            '7': '已完成',
            '8': '终止',
            '9': '暂停'
        },
    },
    {
        title: '开始评审日期',
        dataIndex: 'reviewStartTime',
        key: 'reviewStartTime',
        valueType: 'date'
    },
    {
        title: '确认人',
        dataIndex: 'handlerUserName',
        key: 'handlerUserName'
    },
]


const recordList = [
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
        title: '需求类型',
        dataIndex: 'reqType',
        key: 'reqType'
    },
    {
        title: '需求主题',
        dataIndex: 'reqTopic',
        key: 'reqTopic'
    },
    {
        title: '数据类型',
        dataIndex: 'dataType',
        key: 'dataType'
    },
    {
        title: '关联客户',
        dataIndex: 'customer',
        key: 'customer'
    },
    {
        title: '发布日期',
        dataIndex: 'pubTime',
        key: 'pubTime',
        search: true,
        valueType: 'date'
    },
    {
        title: '需求人',
        dataIndex: 'reqUserName',
        key: 'reqUserName'
    },
    {
        title: '是否受委托',
        dataIndex: 'ifIntrust',
        key: 'ifIntrust',
        valueType: 'select',
        valueEnum: {'Y': '是', 'N': '否'},
    },
    {
        title: '代理人',
        dataIndex: 'intrustUser',
        key: 'intrustUser'
    },
    {
        title: '紧急程度',
        dataIndex: 'emergent',
        key: 'emergent',
        valueType: 'select',
        valueEnum: {'S': '极高', 'H': '高', 'M': '中', 'L': '低'}
    },
    {
        title: '评审人',
        dataIndex: 'reviewUserName',
        key: 'reviewUserName'
    },
    {
        title: '确认人',
        dataIndex: 'handlerUserName',
        key: 'handlerUserName'
    },
    {
        title: '需求状态',
        dataIndex: 'status',
        key: 'status',
        valueType: 'select',
        valueEnum: {
            '1': '待发布',
            '2': '待评审',
            '3': '待确认',
            '4': '未通过',
            '5': '待执行',
            '6': '执行中',
            '7': '已完成',
            '8': '终止',
            '9': '暂停'
        },
    },

]


export {
    unPublishList, publishList, reviewList, confirmList, recordList
}





