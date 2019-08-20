//引入
let conn = require('../utils/sqlHelper');
//获得所有评论
exports.getAllComments = (obj, callback) => {
    let sql = `select c.*, p.title from comments c
                join posts p
                on c.post_id = p.id
                where c.isDel = 0
                order by c.id desc
                limit ${(obj.pageNum - 1) * obj.pageSize}, ${obj.pageSize}
                `;
    conn.query(sql, (err, result) => {
        if(err){
            callback(err)
        }else{
            let sql = `select count(*) cnt from comments c
                join posts p
                on c.post_id = p.id
                where c.isDel = 0`
            conn.query(sql, (err2, res2) => {
                if(err2){
                    callback(err2)
                }else{
                    callback(null, {data: result, total: res2[0].cnt})
                }
            })
        }
    })
}
//批准
exports.editComStatusAgreeById = (id, callback) => {
    let sql = `update comments set status = "approved" where id in (${id})`;
    conn.query(sql, (err, result) => {
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}

//拒绝
exports.editComStatusRefuceById = (id, callback) => {
    let sql = `update comments set status = "held" where id in (${id})`;
    conn.query(sql, (err, result) => {
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}

//删除
exports.delCommentsStatusById = (id, callback) => {
    let sql = `update comments set isDel = 1 where id in (${id}) `;
    conn.query(sql, (err, result) => {
        if(err){
            callback(err)
        }else{
            callback(null)
        }
    })
}