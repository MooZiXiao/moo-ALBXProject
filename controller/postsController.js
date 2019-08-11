//引入
const postsModel = require('../model/postsModel');
//全部文章的显示
exports.getAllPosts = (req, res) => {
    let obj = req.query;
    postsModel.getAllPosts(obj, (err, data) => {
        if (err) {
            res.json({ code: 403, msg: '获取文章错误' })
        } else {
            res.json({ code: 200, msg: '获取文章成功', data: data })
        }
    })
}
//查询别名
exports.checkSlugInPost = (req, res) => {
    let obj = req.query;
    postsModel.checkSlugInPost(obj, (err) => {
        if (err) {
            res.json({ code: 403, msg: '别名已经存在' })
        } else {
            res.json({ code: 200, msg: '别名可以使用' })
        }
    })
}
//新增文章
exports.addPost = (req, res) => {
    let obj = req.body;
    obj.id = null;
    obj.user_id = req.session.currentUser.id;
    obj.views = 0;
    obj.likes = 0;
    postsModel.addPost(obj, (err) => {
        if (err) {
            console.log(err)
            res.json({ code: 403, msg: '新增文章错误' })
        } else {
            res.json({ code: 200, msg: '新增文章成功' })
        }
    })
}