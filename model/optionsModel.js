const conn = require('../utils/sqlHelper');
//获得菜单
exports.getNavMenus = (callback) => {
    let sql = 'select value from options where id = 9';
    conn.query(sql, (err, result) => {
        let data = JSON.parse(result[0].value);
        callback(null, data);
    })
}
//新增菜单
exports.addNavMenus = (obj, callback) => {
    let sql = 'select value from options where id = 9';
    conn.query(sql, (err, result) => {
        if(err){
            callback(err);
        }else{
            let old = JSON.parse(result[0].value);
            old.push(obj);
            let str = JSON.stringify(old);
            console.log(str)
            sql = 'update options set value=? where id = 9';
            conn.query(sql, str, (err2) => {
                if(err2){
                    callback(err2);
                }else{
                    callback(null)
                }
            })
        }
    })
}