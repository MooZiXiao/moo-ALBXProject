//引入
const conn = require('../utils/sqlHelper');
//全部分类
exports.getAllCategories = (callback) => {
    let sql = 'select * from categories where isDel = 0';
    conn.query(sql, (err, result) => {
        if(err){
            callback(err);
        }else{
            callback(null, result);
        }
    })
}