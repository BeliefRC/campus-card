const Card = require('../controllers/Card');
const Admin = require('../controllers/Admin');

module.exports = app => {
    //管理员
    app.post('/admin/login', Admin.login);

    //用户
    app.post('/card/login', Card.login);
    app.post('/card/register', Admin.adminRequired, Card.register);
    app.get('/card/getCode', Admin.adminRequired, Card.getCode);
};