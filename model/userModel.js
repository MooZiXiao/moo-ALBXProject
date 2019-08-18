//引入
const conn = require('../utils/sqlHelper');
//登录
exports.login = (email, callback) => {
    let sql =  'select * from users where email=?';
    conn.query(sql, email, (err, result) => {
        if(err){
            callback(err);
        }else{
            callback(null, result[0]);
        }
    })
}
//用户表所有用户信息
exports.getAllUsers = (callback) => {
    let sql = 'select * from users where isDel = 0';
    conn.query(sql, (err, result) => {
        if(err){
            callback(err)
        }else{
            callback(null, result)
        }
    })
}
//添加用户
exports.addUser = (obj, callback) => {
    let sql = 'insert into users set ?';
    conn.query(sql, obj, (err, result) => {
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}
//编辑用户
exports.editUser = (obj, callback) => {
    let sql = 'update users set ? where email= ? ';
    conn.query(sql, [obj, obj.email], (err, result) => {
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}
//删除用户
exports.delUserById = (id, callback) => {
    let sql = `update users set isDel = 1 where id in (${id})`
    conn.query(sql, (err, result) => {
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}