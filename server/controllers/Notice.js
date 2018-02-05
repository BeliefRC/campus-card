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

//公告详情
exports.detail = async (req, res) => {
    let _id = req.query._id;
    let user = req.session.user;
    try {
        //不是管理员查看则浏览量+1
        if (!user.isAdmin) {
            await Notice.findOneAndUpdate({_id}, {$inc: {pv: 1}});
        }
        let notice = await Notice.findOne({_id});
        if (notice) {
            res.json(setJson(true, '新增通知成功', notice))
        } else {
            res.json(setJson(false, '查看公告详情失败', null))
        }
    }
    catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null))
    }
};

//通知列表
exports.list = async (req, res) => {
    try {
        let user = req.session.user, notices;
        if (user.isAdmin && req.body.listTable) {
            notices = await Notice.find().sort({'meta.updateAt': -1});
        } else {
            notices = await Notice.find({isShow: true}).sort({'meta.updateAt': -1});
        }
        res.json(setJson(true, '获取公告列表', notices))
    }
    catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null))
    }
};

//删除通知
exports.delete = async (req, res) => {
    try {
        let _id = req.body._id;
        let notice = await Notice.findOneAndRemove({_id});
        res.json(setJson(true, '删除公告成功', notice))
    }
    catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null))
    }
};
//更新通知
exports.update = async (req, res) => {
    try {
        let _notice = req.body;
        let _id = _notice._id;
        if (_notice.isShow === 'true') {
            _notice.isShow = true
        } else if (_notice.isShow === 'false') {
            _notice.isShow = false;
        }
        let notice = await Notice.findOne({_id});
        Object.assign(notice, _notice);
        notice = await notice.save();
        res.json(setJson(true, '更新公告成功', notice))
    }
    catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null))
    }
};

//显示操作
exports.show = async (req, res) => {
    let _id = req.body._id;
    try {
        let notice = await Notice.findOne({_id});
        notice.isShow = !notice.isShow;
        notice = await notice.save();
        let str = notice.isShow ? '显示' : '取消显示';
        res.json(setJson(true, `${str}成功`, notice))
    } catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null))
    }
};


