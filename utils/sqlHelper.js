//mysql
const mysql = require('mysql');
//创建连接
const conn = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'moo-albx',
    dateStrings: true
})

module.exports = conn;