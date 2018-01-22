const Card = require('../models/Card');
const setJson = require('../until/SetJson');

const comparePasswordPromise = (card, password) => {
    return new Promise((resolve, reject) => {
        card.comparePassword(password, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
};

//用户登录
exports.login = async (req, res) => {
    let _card = req.body;
    let code = _card.code;
    let password = _card.password;
    try {
        let card = await Card.findOne({code});
        //首先检查用户是否存在
        if (!card) {
            console.log('用户名不存在');
            res.json(setJson(false, '用户名不存在，请联系管理员', null));
        } else {
            let isMatch = await comparePasswordPromise(card, password);
            //密码是否正确
            if (isMatch) {
                console.log(`${code}:登陆成功`);
                req.session.user = card;
                res.json(setJson(true, '登陆成功', card));
            } else {
                res.json(setJson(false, '密码错误', null));
            }
        }
    }
    catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null));
    }
};

//退出登录
exports.logout = (req, res) => {
    try {
        delete req.session.user;
        res.json(setJson(true, '登陆成功', null));
    } catch (e) {
        res.json(setJson(false, e.message, null));
    }
};

//新增卡
exports.register = async (req, res) => {
    const _card = req.body;
    try {
        let card = await Card.find({code: _card.code});
        if (card.length) {
            console.log('一卡通账号重复');
            res.json(setJson(false, '一卡通账号重复,请刷新页面', null));
        }
        card = new Card(_card);
        await card.save();
        res.json(setJson(true, '新增卡成功', null));
    }
    catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null));
    }
};

//更新卡
exports.update = async (req, res) => {
    const _card = req.body;
    try {
        let card = await Card.findOneAndUpdate({code: _card.code},_card);
        res.json(setJson(true, '更新成功', card));
    }
    catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null));
    }
};

//获取卡号
exports.getCode = async (req, res) => {
    try {
        let card = await Card.find();
        let len = (parseInt((card[card.length - 1]).code, 10) + 1).toString();
        let code = len.padStart(6, '0');
        res.json(setJson(true, '获取卡号成功', code));
    }
    catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null));
    }
};

//获取持卡人列表
exports.cardList = async (req, res) => {
    try {
        let cards = await Card.find({})
            .sort({'meta.updateAt': -1});
        res.json(setJson(true, '查询电列表情成功', cards))
    } catch (e) {
        console.log(e);
        res.json(setJson(false, e.stack, null))
    }
};

//删除卡
exports.deleteCard = async (req, res) => {
    let _id = req.body._id;
    try {
        let card = await Card.findOneAndRemove({_id});
        res.json(setJson(true, `删除持卡人${card.cardholder}成功`, null))
    } catch (e) {
        console.log(e);
        res.json(setJson(false, e.stack, null))
    }
};

//卡片信息详情
exports.detail = async (req, res) => {
    let code = req.query.code;
    try {
        let card = await Card.findOne({code}, 'code cardholder sex type');
        if (card) {
            res.json(setJson(true, '查看详情成功', card))
        } else {
            res.json(setJson(false, 'not found，请确认一卡通账号是否正确', null))
        }
    } catch (e) {
        console.log(e);
        res.json(setJson(false, e.stack, null))
    }
};