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
//别名
exports.checkSlugInPost = (slug, callback) => {
    let sql = `select * from posts where slug = '${slug}'`;
    conn.query(sql, (err, result) => {
        if(err){
            callback(err);
        }else{
            callback(null, result[0])
        }
    })
}
//新增文章
exports.addPost = (obj, callback) => {
    let sql = 'insert into posts set ?';
    conn.query(sql, obj, (err, result) => {
        if(err){
            callback(err);
        }else{
            callback(null);
        }
    })
}
//获得id对应的文章
exports.getPostById = (id, callback) => {
    let sql = `select p.*, u.nickname, c.name from posts p
                join users u
                join categories c
                on p.user_id = u.id and p.category_id = c.id
                where p.isDel = 0 and p.id =` + id;
    conn.query(sql, (err, result) => {
        if(err){
            callback(err);
        }else{
            callback(null, result[0]);
        }
    })
}
//编辑文章
exports.editPost = (obj, callback) => {
    let sql = 'update posts set ? where id = ?';
    conn.query(sql, [obj, obj.id], (err, result) => {
        if(err){
            callback(err);
        }else{
            callback(null);
        }
    })
}
//删除文章
exports.delPostById = (id, callback) => {
    let sql = `update posts set isDel=1 where id in (${id})`;
    conn.query(sql, (err, result) => {
        if(err){
            callback(err);
        }else{
            callback(null);
        }
    })
}