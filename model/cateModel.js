//引入
const conn = require('../utils/sqlHelper');
//全部分类
exports.getAllCategories = (callback) => {
    let sql = 'select * from categories where isDel = 0 order by id desc';
    conn.query(sql, (err, result) => {
        if(err){
            callback(err);
        }else{
            callback(null, result);
        }
    })
}
//新增
exports.addCate = (obj, callback) => {
    let sql = 'insert into categories set ?';
    conn.query(sql, obj, (err, result) => {
        if(err){
            callback(err);
        }else{
            callback(null);
        }
    })
}
//编辑
exports.editCateById = (obj, callback) => {
    let sql = 'update categories set ? where id=?';
    conn.query(sql, [obj, obj.id], (err, result) => {
        if(err){
            callback(err);
        }else{
            callback(null);
        }
    })
}
//删除
exports.delCateById = (id, callback) => {
    let sql = `update categories set isDel=1 where id in (${id})`;
    conn.query(sql, (err, result) => {
        if(err){
            callback(err);
        }else{
            callback(null);
        }
    })
}
