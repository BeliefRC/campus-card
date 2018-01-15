const Card = require('../controllers/Card');

module.exports = app => {
    app.post('/card/login', Card.login)
};