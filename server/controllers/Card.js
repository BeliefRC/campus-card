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
                req.session.card = card;
                res.json(setJson(true, '登陆成功', card));
            } else {
                res.json(setJson(false, '密码错误', null));
            }
        }
    }
    catch (e) {
        console.log(e);
        res.json(setJson(false, e.stack, null));
    }
};

//新增卡
exports.register = async (req, res) => {
    const _card = req.body;
    try {
        let card = await Card.find({code: _card.code});
        if (card.length) {
            console.log('一卡通账号重复');
            res.json(setJson(false, '一卡通账号重复', null));
        }
        card = new Card(_card);
        await card.save();
        res.json(setJson(true, '新增卡成功', null));
    }
    catch (e) {
        res.json(setJson(false, e.stack, null));
    }
};