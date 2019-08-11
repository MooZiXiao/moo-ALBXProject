const moment = require('moment');
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
            res.json({ code: 403, msg: '新增文章错误' })
        } else {
            res.json({ code: 200, msg: '新增文章成功' })
        }
    })
}
//获得id对应的文章
exports.getPostById = (req, res) => {
    let id = req.query.id;
    postsModel.getPostById(id, (err, data) => {
        if (err) {
            res.json({ code: 403, msg: '文章获取失败'})
        } else {
            data.created = moment(data.created).format('YYYY-MM-DDTHH:mm')
            res.json({ code: 200, msg: '文章获取成功', data})
        }
    })
}
//编辑文章
exports.editPost = (req, res) => {
    let obj = req.body;
    postsModel.editPost(obj, (err) => {
        if (err) {
            res.json({ code: 403, msg: '编辑文章失败' })
        } else {
            res.json({ code: 200, msg: '编辑文章成功' })
        }
    })
}
//根据id删除文章
exports.delPostById = (req, res) => {
    let id = req.query.id;
    postsModel.delPostById(id, (err) => {
        if (err) {
            res.json({ code: 403, msg: '删除文章失败' })
        } else {
            res.json({ code: 200, msg: '删除文章成功' })
        }
    })
}