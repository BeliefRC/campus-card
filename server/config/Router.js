const Card = require('../controllers/Card');
const Admin = require('../controllers/Admin');

module.exports = app => {
    //退出登录
    app.post('/logout',Card.logout);

    //管理员
    app.post('/admin/login', Admin.login);

    //用户
    app.post('/card/login', Card.login);
    app.post('/card/register', Admin.adminRequired, Card.register);
    app.get('/card/getCode', Admin.adminRequired, Card.getCode);
    app.get('/card/list', Admin.adminRequired, Card.cardList);
    app.post('/card/delete', Admin.adminRequired, Card.deleteCard);
};