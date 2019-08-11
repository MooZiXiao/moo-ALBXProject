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