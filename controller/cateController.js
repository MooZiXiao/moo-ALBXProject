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