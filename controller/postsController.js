//引入
const postsModel = require('../model/postsModel');
//全部文章的显示
exports.getAllPosts = (req, res) => {
    let obj = req.query;
    postsModel.getAllPosts(obj, (err, data) => {
        if(err){
            res.json({code: 400, msg: '获取文章错误'})
        }else{
            res.json({code: 200, msg: '获取文章成功', data: data})
        }
    })
}