//引入
const postsModel = require('../model/postsModel');
//全部文章的显示
exports.getAllPosts = (req, res) => {
    postsModel.getAllPosts((err, data) => {
        if(err){
            res.json({code: 400, msg: '获取文章错误'})
        }else{
            res.json({code: 200, msg: '获取文章成功', data: data})
        }
    })
}