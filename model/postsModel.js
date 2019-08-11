//引入
const conn = require('../utils/sqlHelper');
//获得全部文章
exports.getAllPosts = (obj, callback) => {
    let sql = `select p.*, u.nickname, c.name from posts p
                join users u
                join categories c
                on p.user_id = u.id and p.category_id = c.id
                where p.isDel = 0 `;
    if(obj.cate && obj.cate!== 'all'){
        sql += ` and p.category_id = ${obj.cate} `;
    }
    if(obj.status && obj.status !== 'all'){
        sql += ` and p.status = '${obj.status}' `;
    }
    sql += ` order by p.id desc
            limit ${(obj.pageNum-1) * obj.pageSize}, ${obj.pageSize}`;
    conn.query(sql, (err, result) => {
        if (err) {
            callback(err);
        } else {
            sql = `select count(*) cnt from posts p
                    join users u
                    join categories c
                    on p.user_id = u.id and p.category_id = c.id
                    where p.isDel = 0 `;
            if(obj.cate && obj.cate !== 'all'){
                sql += ` and p.category_id = ${obj.cate} `;
            }
            if(obj.status && obj.status !== 'all'){
                sql += ` and p.status = '${obj.status}' `;
            }
            conn.query(sql, (err2, res2) => {
                if(err2){
                    callback(err2);
                }else{
                    callback(null, {data: result, total: res2[0].cnt});
                }
            })
        }
    })
}