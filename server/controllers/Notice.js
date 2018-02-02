const Notice = require('../models/Notice');
const setJson = require('../until/SetJson');

//新增通知
exports.new = async (req, res) => {
    let _notice = req.body;
    try {
        if (_notice.isShow === 'true') {
            _notice.isShow = true
        } else if (_notice.isShow === 'false') {
            _notice.isShow = false;
        }
        _notice.createPerson = '校园一卡通平台';
        let notice = new Notice(_notice);
        notice = await notice.save();
        res.json(setJson(true, '新增通知成功', notice))
    }
    catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null))
    }
};
//通知列表
exports.list = async (req, res) => {
    try {
        let notices = await Notice.find().sort({'meta.updateAt': -1});
        res.json(setJson(true, '获取公告列表', notices))
    }
    catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null))
    }
};


