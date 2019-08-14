//引入
const cateModel = require('../model/cateModel');

//全部分类
exports.getAllCategories = (req, res) => {
    cateModel.getAllCategories((err, data) => {
        if(err){
            res.json({code: 403, msg: '获取分类数据失败'})
        }else{
            res.json({code: 200, msg: '获取分类数据成功', data})
        }
    })
}
//新增
exports.addCate = (req, res) => {
    let obj = req.body;
    obj.id = null;
    cateModel.addCate(obj, (err) => {
        if(err){
            res.json({code: 403, msg: '新增分类失败'})
        }else{
            res.json({code: 200, msg: '新增分类成功'})
        }
    })
}
//编辑
exports.editCateById = (req, res) => {
    let obj = req.body;
    cateModel.editCateById(obj, (err) => {
        if(err){
            res.json({code: 403, msg: '编辑分类失败'})
        }else{
            res.json({code: 200, msg: '编辑分类成功'})
        }
    })
}
//删除
exports.delCateById = (req, res) => {
    let id = req.query.id;
    cateModel.delCateById(id, (err) => {
        if(err){
            res.json({code: 403, msg: '删除分类失败'})
        }else{
            res.json({code: 200, msg: '删除分类成功'})
        }
    })
}