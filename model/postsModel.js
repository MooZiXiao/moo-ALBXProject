//引入
const conn = require('../utils/sqlHelper');
//获得全部文章
exports.getAllPosts = (callback) => {
    let sql = `select p.*, u.nickname, c.name from posts p
                join users u
                join categories c
                on p.user_id = u.id and p.category_id = c.id
                where p.isDel = 0 `;
    conn.query(sql, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}