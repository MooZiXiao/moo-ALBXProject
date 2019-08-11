//模块
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
//引入
const router = require('./router');

//创建服务器
const app = express();
//绑定端口,ip
app.listen(8080, '127.0.0.1', () => {
    console.log('http://127.0.0.1:8080');
})
//处理静态资源
app.use('/assets', express.static('assets'));
app.use('/uploads', express.static('uploads'));

//默认模板
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//session
app.use(session({
    secret: 'moo-albx',
    resave: false,
    saveUninitialized: false
}))

//全局中间件
app.use(function(req, res, next){
    if(req.session.isLogin && req.session.isLogin === 'true' || req.url === '/admin/login' || req.url.indexOf('/admin') === -1){
        next();
    }else{
        res.redirect('/admin/login');
    }
})

//路由
app.use(router);