//模块
const express = require('express');

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

//路由
app.use(router);