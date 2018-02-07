const Card = require('../models/Card');
const Admin = require('../models/Admin');
const setJson = require('../until/SetJson');
const fs = require('fs');
const path = require('path');

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

const readFilePromise = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
};

const writeFilePromise = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err, data) => {
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
                console.log(`${code}(${Card.cardholder}):登陆成功`);
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
        _card.bills = [{time: Date.now(), place: '校园一卡通平台', amount: 80.00, type: '充值'}];
        card = new Card(_card);
        await card.save();
        res.json(setJson(true, '新增卡成功', null));
    }
    catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null));
    }
};

//上传图片
exports.upload = async (req, res, next) => {
    try {
        let photoData = req.body.photo.file.response.backData;
        let filePath = photoData ? photoData.path : '';
        let originalFilename = photoData ? photoData.originalFilename : '';
        //存在上传的文件则保存到服务器
        if (originalFilename) {
            let data = await readFilePromise(filePath);
            let timestamp = Date.now();
            let type = photoData.type.split('/')[1];
            let photo = `${timestamp}.${type}`;
            let newPath = path.join(__dirname, '../../', '/src/static/upload/' + photo);
            await  writeFilePromise(newPath, data);
            req.body.photo = photo;
        }
        next()
    }
    catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null));
    }
};

//上传图片预处理
exports.beforeUpload = async (req, res) => {
    try {
        let photoData = req.files.photo;
        let originalFilename = photoData ? photoData.originalFilename : '';
        if (originalFilename) {
            res.json(setJson(true, '服务端已准备好接收图片', photoData));
        } else {
            res.json(setJson(false, '请选择需要上传的图片', null));
        }
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
        let card = await Card.findOneAndUpdate({code: _card.code}, _card, {new: true});
        card = await card.save();
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
        console.log(e.stack);
        res.json(setJson(false, e.message, null))
    }
};

//删除卡
exports.deleteCard = async (req, res) => {
    let _id = req.body._id;
    try {
        let card = await Card.findOneAndRemove({_id});
        res.json(setJson(true, `删除持卡人${card.cardholder}成功`, null))
    } catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null))
    }
};

//卡片信息详情
exports.detail = async (req, res) => {
    let code = req.query.code;
    try {
        let card = await Card.findOne({code}, 'code cardholder sex type isFrozen balance photo');
        if (card) {
            res.json(setJson(true, '查看详情成功', card))
        } else {
            res.json(setJson(false, 'not found，请确认一卡通账号是否正确', null))
        }
    } catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null))
    }
};

//挂失操作
exports.frozen = async (req, res) => {
    let code = req.body.code;
    try {

        let card = await Card.findOne({code});
        card.isFrozen = !card.isFrozen;
        card = await Card.findOneAndUpdate({code}, card);
        let str = card.isFrozen ? '挂失' : '解挂';
        res.json(setJson(true, `${str}成功`, card))
    } catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null))
    }
};

//重置密码操作
exports.resetPassword = async (req, res) => {
    let code = req.body.code;
    try {
        let card = await Card.findOne({code});
        card.password = '666666';
        card = await card.save();
        res.json(setJson(true, `重置成功`, card))
    } catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null))
    }
};
//重置密码操作
exports.changePassword = async (req, res) => {
    let code = req.session.user.code;
    let oldPassword = req.body.oldPassword;
    let password = req.body.password;
    try {
        let card = await Card.findOne({code});
        if (!card) {
            console.log('用户名不存在');
            res.json(setJson(false, '登录状态异常，请重新登录系统', null));
        } else {
            let isMatch = await comparePasswordPromise(card, oldPassword);
            //密码是否正确
            if (isMatch) {
                card.password = password;
                card = await card.save();
                res.json(setJson(true, `修改成功`, null))
            } else {
                res.json(setJson(false, '修改失败，原密码错误', null));
            }
        }
    } catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null))
    }
};

//充值操作
exports.recharge = async (req, res) => {
    let code = req.body.code,
        password = req.body.password,
        rechargeAmount = parseFloat(req.body.rechargeAmount),
        isAdmin = req.session.user.isAdmin;
    try {
        let card, admin, isMatch;
        //从session中判断是否为管理员,是则找出管理员
        if (isAdmin) {
            let adminCode = req.session.user.code;
            admin = await Admin.findOne({code: adminCode});
        }
        //找到需要充值的卡
        card = await Card.findOne({code});

        if (!card) {
            res.json(setJson(false, `登录信息错误，请重新登录`, card))
        } else {
            if (card.isFrozen) {
                res.json(setJson(false, `校园卡已挂失，请先解除挂失`, null))
            }
            //验证管理员密码或者是用户密码
            if (isAdmin) {
                isMatch = await comparePasswordPromise(admin, password);
            } else {
                isMatch = await comparePasswordPromise(card, password);
            }
            //密码是否正确
            if (isMatch) {
                card = await Card.findOneAndUpdate({code}, {
                    $inc: {balance: rechargeAmount},
                    $addToSet: {bills: {time: Date.now(), place: '校园一卡通平台', amount: rechargeAmount, type: '充值'}}
                }, {new: true});
                res.json(setJson(true, `充值成功`, card))
            } else {
                res.json(setJson(false, '密码错误', null));
            }
        }

    } catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null))
    }
};

//购物
exports.shop = async (req, res) => {
    try {
        let price = parseFloat(req.body.price);
        let place = req.body.name;
        let code = req.session.user.code;
        let card = await Card.findOne({code});
        //首先判断是否挂失
        if (card.isFrozen) {
            res.json(setJson(false, `校园卡已挂失，请先解除挂失`, null))
        }
        //判断余额是否充足
        else if (card.balance >= price) {
            card = await Card.findOneAndUpdate({code}, {
                $inc: {balance: -price},
                $addToSet: {bills: {time: Date.now(), place: place, amount: price, type: '消费'}}
            }, {new: true});
            res.json(setJson(true, `消费成功`, card))
        } else {
            res.json(setJson(false, `余额不足，请充值`, null))
        }
    } catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null))
    }
};

//流水列表
exports.billList = async (req, res) => {
    let code = req.body.code;
    try {
        let card = await Card.findOne({code}, 'cardholder bills balance');
        if (card) {
            res.json(setJson(true, '', card))
        } else {
            res.json(setJson(false, 'not found，请确认一卡通账号是否正确', null))
        }
    } catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null))
    }
};