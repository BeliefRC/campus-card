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

exports.login = async (req, res) => {
    let _user = req.body;
    let code = _user.code;
    let password = _user.password;
    try {
        let user = await Card.findOne({code});
        //首先检查用户是否存在
        if (!user) {
            console.log('用户名不存在');
            res.json(setJson(false, '用户名不存在，请联系管理员', null));
        } else {
            let isMatch = await comparePasswordPromise(user, password);
            //密码是否正确
            if (isMatch) {
                console.log(`${code}:登陆成功`);
                req.session.user = user;
                res.json(setJson(true, '登陆成功', user));
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