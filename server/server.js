const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoStore = require('connect-mongo')(session);
const logger = require('morgan');
const multipart = require('connect-multiparty');//处理混合表单

const bodyParser = require('body-parser');
const app = express();
const Router = require('./config/Router');

const Admin = require('./models/Admin');

console.log(process.env.NODE_ENV);
let port = process.env.PORT || 3001,
    env = process.env.NODE_ENV || 'development',
    allowDomain = "http://localhost:3000";

//数据库连接
let dbUrl = 'mongodb://localhost/campusCard';
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl, {useMongoClient: true})
    .then(() => {
        console.log(`已连接${dbUrl}`);

    }).catch((e) => {
    console.log(e.stack);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", allowDomain);
    res.header("Access-Control-Allow-Headers", "Content-Type,x-requested-with");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

//当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//session依赖于cookie
app.use(cookieParser());

app.use(multipart());

app.use(session({
    secret: 'campusCard',
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions',
    }),
    resave: false,
    saveUninitialized: true
}));

if ('development' === env) {
    app.set('showStackError', true);
    app.use(logger(':method :url :status'));
    app.locals.pretty = true;
    mongoose.set('debug', true)
}

//自动创建超级管理员
(async function () {
    try {
        let hasAdmin = await Admin.findOne({code: 'admin'});
        if (hasAdmin) {
            console.log(`存在超级管理员${hasAdmin}`);
        } else {
            let admin = new Admin({
                code: 'admin',
                password: 'admin',
                isAdmin: true
            });
            let newAdmin = await admin.save();
            console.log(`创建超级管理员成功${newAdmin}`);
        }
    } catch (e) {
        console.log(e.stack);
    }
})();
Router(app);
app.listen(port);

