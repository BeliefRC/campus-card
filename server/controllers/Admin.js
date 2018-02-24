const Admin = require('../models/Admin');
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

//管理员登录
exports.login = async (req, res) => {
    console.log(req.session);
    let _user = req.body;
    let code = _user.code;
    let password = _user.password;
    try {
        let user = await Admin.findOne({code});
        //首先检查用户是否存在
        if (!user) {
            console.log('用户名不存在');
            res.json(setJson(false, '用户名不存在，请注册', null));
        } else {
            let isMatch = await comparePasswordPromise(user, password);
            //密码是否正确
            if (isMatch) {
                console.log(`${code}:登陆成功`);
                req.session.user = user;
                req.session.isAdmin = true;
                res.json(setJson(true, '登陆成功', user));
            } else {
                res.json(setJson(false, '密码错误', null));
            }
        }
    }
    catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null))
    }
};


// 验证管理员权限，中间件
exports.adminRequired = (req, res, next) => {
    let user = req.session.user;
    if (user&&user.isAdmin) {
        next();
    } else {
        res.json(setJson(false, '权限不足', null));
    }
};
// 验证是否登录，中间件
exports.loginRequired = (req, res, next) => {
    let user = req.session.user;
    if (user) {
        next();
    } else {
        res.json(setJson(false, '请登录', null));
    }
};