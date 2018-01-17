const Card = require('../controllers/Card');
const Admin = require('../controllers/Admin');

module.exports = app => {
    app.post('/admin/login', Admin.login);
    app.post('/card/login', Card.login);
    app.post('/card/register', Admin.adminRequired, Card.register);
};