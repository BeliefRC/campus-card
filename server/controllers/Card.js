// const Card = require('../models/Card');
const setJson = require('../until/SetJson');

/*const comparePasswordPromise = (card, password) => {
    return new Promise((resolve, reject) => {
        card.comparePassword(password, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
};*/

exports.login = async (req, res) => {
    let _user = req.body;
    let username = _user.username;
    let password = _user.password;
    console.log(username, password);
    try {
        res.json(setJson(true, '登陆成功', null));
    }
    catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null));
    }
};