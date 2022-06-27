//在列表页未做成可配置化之前，页面信息存储在这里
const userList = [
    {title: '用户编号', dataIndex: 'user_id', key: 'user_id'},
    {title: '用户姓名', dataIndex: 'user_name', key: 'user_name'},
    {title: '邮箱', dataIndex: 'email', key: 'email', search: false},
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        valueType: 'select',
        valueEnum: {'Y': '生效', 'N': '失效'},
        search: false
    },
    {
        title: '是否内部',
        dataIndex: 'ldap_flag',
        key: 'ldap_flag',
        valueType: 'select',
        valueEnum: {'内部': '内部', '外部': '外部'},
        search: false
    },
]

const roleList = [
    {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        valueType: 'indexBorder'
    },
    {
        title: '角色ID',
        dataIndex: 'roleId',
        key: 'roleId'
    },
    {
        title: '角色名',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: '角色说明',
        dataIndex: 'description',
        key: 'description'
    },
    {
        title: '更新时间',
        dataIndex: 'updateTime',
        key: 'updateTime',
        valueType: 'date'
    },
    {
        title: '操作',
        dataIndex: '',
        key: 'operation',
    }
]

export {userList, roleList}