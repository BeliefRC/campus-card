const Card = require('../controllers/Card');
const Admin = require('../controllers/Admin');
const Notice = require('../controllers/Notice');
const Instruction = require('../controllers/Instruction');

module.exports = app => {
    //退出登录
    app.post('/logout', Card.logout);

    //管理员
    app.post('/admin/login', Admin.login);
    app.post('/card/register', Admin.adminRequired, Card.upload, Card.register);
    app.get('/card/getCode', Admin.adminRequired, Card.getCode);
    app.get('/card/list', Admin.adminRequired, Card.cardList);
    app.post('/card/delete', Admin.adminRequired, Card.deleteCard);
    app.post('/admin/resetPassword', Admin.adminRequired, Card.resetPassword);

    //用户
    app.post('/card/login', Card.login);
    app.post('/card/changePassword', Admin.loginRequired, Card.changePassword);
    app.post('/card/shop', Admin.loginRequired, Card.shop);

    //公共
    app.get('/card/detail', Admin.loginRequired, Card.detail);
    app.post('/card/update', Admin.loginRequired, Card.upload, Card.update);
    app.post('/card/frozen', Admin.loginRequired, Card.frozen);
    app.post('/card/recharge', Admin.loginRequired, Card.recharge);
    app.post('/card/billList', Admin.loginRequired, Card.billList);
    app.post('/card/beforeUpload', Admin.loginRequired, Card.beforeUpload);

    //公告
    app.post('/notice/new', Admin.adminRequired, Notice.new);
    app.post('/notice/update', Admin.adminRequired, Notice.update);
    app.get('/notice/detail', Notice.detail);
    app.post('/notice/list', Notice.list);
    app.post('/notice/delete', Admin.adminRequired, Notice.delete);
    app.post('/notice/show', Admin.adminRequired, Notice.show);

    //使用说明
    app.post('/instruction/save', Admin.adminRequired, Instruction.save);
    app.get('/instruction/detail', Instruction.detail);

};
