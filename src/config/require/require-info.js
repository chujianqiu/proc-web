//在info页面未做成可配置化之前，页面信息存储于此
const baseInfo = [
    {
        name: 'reqId',
        label: '需求编号',
        type: 'input',
        placeholder: '选择"需求类型"后系统自动生成',
        readOnly: true
    },
    {
        name: 'dataType',
        label: '数据类型',
        type: 'select',
        rules: [{required: true, message: '请选择数据类型!'}],
        select: [
            {code: '诉讼', value: '诉讼'}, {code: '税务', value: '税务'}, {code: '环保', value: '环保'}, {code: '舆情', value: '舆情'},
            {code: '行政处罚', value: '行政处罚'}, {code: '招投标', value: '招投标'}, {code: '其他', value: '其他'}
        ]
    },
    {
        name: 'reqTopic',
        label: '需求主题',
        type: 'input',
        rules: [{required: true, message: '请输入需求主题!'}]},
    {
        name: 'taskType',
        label: '任务类型',
        type: 'select',
        rules: [{required: true, message: '请选择任务类型!'}],
        select: [
            {code: 'TZ', value: '拓展'}, {code: 'XZ', value: '下载'}, {code: 'CL', value: '处理'}, {code: 'TZ,XZ', value: '拓展，下载'},
            {code: 'XZ,CL', value: '下载，处理'}, {code: 'TZ,XZ,CL', value: '拓展，下载，处理'},
        ],
        defaultValue: 'TZ'
    },
    {
        name: 'emergent',
        label: '紧急程度',
        type: 'select',
        rules: [{required: true, message: '请选择紧急程度!'}],
        select: [{code: 'S', value: '极高'}, {code: 'H', value: '高'}, {code: 'M', value: '中'}, {code: 'L', value: '低'}],
        defaultValue: 'M'
    },
    {
        name: 'deadline',
        label: '完成时限',
        type: 'datePicker',
        rules: [{required: true, message: '请选择完成时限'}]},
    {
        name: 'customer',
        label: '关联客户',
        type: 'input',
        rules: [{required: true, message: '请输入关联客户'}],
        placeholder: '非外部客户统一填写“内部”'
    },
    {
        name: 'jiraNo',
        label: '关联JIRA编号',
        type: 'input'
    },
    {
        name: 'reqDesc',
        label: '需求描述',
        type: 'textArea'
    },
    {
        name: 'file',
        label: '附件',
        type: 'upload'
    },
    {
        name: 'ifIntrust',
        label: '是否受委托',
        type: 'radio',
        select: [{code: 'Y', value: '是'}, {code: 'N', value: '否'}],
        defaultValue: 'Y',
        rules: [{required: true, message: '请选择是否受委托!'}]
    },
    {
        name: 'intrustUser',
        label: '委托人',
        type: 'input',
        placeholder: '是代理时才输入该字段'
    }
];

export {baseInfo}