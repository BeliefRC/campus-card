// 首页菜单
const menuData = [
    {
        title: '管理员平台',
        key: 'admin',
        icon: 'tool',
        admin: true,
        children: [
            {
                title: '持卡人列表',
                key: 'admin/cardholderList',
            }, {
                title: '通知公告列表',
                key: 'admin/noticeList',
            }, {
                title: '持卡人流水账单',
                key: 'admin/billList',
            }, {
                title: '持卡人详情信息',
                key: 'admin/cardholderDetail',
            }, {
                title: '操作卡',
                key: 'admin/operate',
            }, {
                title: '新增卡',
                key: 'admin/newCard',
            }, {
                title: '新增/修改公告',
                key: 'admin/newNotice',
            }, {
                title: '编辑使用说明',
                key: 'admin/editInstruction',
            }, {
                title: '下载文件管理',
                key: 'admin/excelManagement',
            }
        ]
    },
    {
        title: '个人中心',
        key: 'userCenter',
        icon: 'user',
        admin: false,
        children: [
            {
                title: '流水查询',
                key: 'userCenter/billList',
            }, {
                title: ' 个人信息修改',
                key: 'userCenter/cardholderDetail',
            }, {
                title: '我的一卡通',
                key: 'userCenter/operate',
            }, {
                title: '自助超市',
                key: 'userCenter/shopping',
            }
        ]
    },
    {
        title: '使用说明',
        key: '/',
        icon: 'exception',
        admin: false,
    },
    {
        title: '通知公告',
        key: 'notice',
        icon: 'notification',
        admin: false,
    },
    {
        title: '办卡流程',
        key: 'process',
        icon: 'retweet',
        admin: false,
    },
    {
        title: '丢卡查询',
        key: 'lostAndFound',
        icon: 'heart',
        admin: false,
    },
    {
        title: '表格下载',
        key: 'excel',
        icon: 'file-excel',
        admin: false,
    }
];

module.exports = menuData;