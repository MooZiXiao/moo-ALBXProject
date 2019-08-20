const commentsModel = require('../model/commentsModel');

//获得所有评论
exports.getAllComments = (req, res) => {
    let obj = req.query;
    commentsModel.getAllComments(obj, (err, data) => {
        if(err){
            res.json({code: 403, msg: '获得数据错误'})
        }else{
            res.json({code: 200, msg: '获得数据成功', data})
        }
    })
}
//修改评论状态为批准
exports.editComStatusAgreeById = (req, res) => {
    let id = req.query.id;
    commentsModel.editComStatusAgreeById(id, (err) => {
        if(err){
            res.json({code: 403, msg: '批准失败'})
        }else{
            res.json({code: 200, msg: '批准成功'})
        }
    })
}
//修改评论状态为拒绝
exports.editComStatusRefuceById = (req, res) => {
    let id = req.query.id;
    commentsModel.editComStatusRefuceById(id, (err) => {
        if(err){
            res.json({code: 403, msg: '批准失败'})
        }else{
            res.json({code: 200, msg: '批准成功'})
        }
    })
}
//删除
exports.delCommentsStatusById = (req, res) => {
    let id = req.query.id;
    commentsModel.delCommentsStatusById(id, (err) => {
        if(err){
            res.json({code: 403, msg: '删除失败'})
        }else{
            res.json({code: 200, msg: '删除成功'})
        }
    })
}