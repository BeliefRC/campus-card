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
                key: 'cardholderList',
            }, {
                title: '通知公告列表',
                key: 'noticeList',
            }, {
                title: '充值缴费',
                key: 'recharge',
            }, {
                title: '挂失登记',
                key: 'reportLoss',
            }, {
                title: '新增卡',
                key: 'addCard',
            }
        ]
    },
    {
        title: '通知公告',
        key: 'notice',
        icon: 'notification',
        admin: false,
    },
    {
        title: '个人中心',
        key: 'userCenter',
        icon: 'user',
        admin: false,
        children: [
            {
                title: '流水查询',
                key: 'billList',
            }, {
                title: ' 自助充值',
                key: 'MyRecharge',
            }, {
                title: '我要挂失',
                key: 'MyReportLoss',
            }
        ]
    },

    {
        title: '使用说明',
        key: 'instructions',
        icon: 'exception',
        admin: false,
    }
    ,
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