const optionsModel = require('../model/optionsModel');

//获得菜单
exports.getNavMenus = (req, res) => {
    optionsModel.getNavMenus((err, data) => {
        if (err) {
            res.json({ code: 403, msg: '获取菜单错误' })
        } else {
            res.json({ code: 200, msg: '获取菜单成功', data })
        }
    })
}
//新增菜单
exports.addNavMenus = (req, res) => {
    let obj = req.body;
    obj.icon = 'fa fa-glass';
    // console.log(obj)
    optionsModel.addNavMenus(obj, (err) => {
        if (err) {
            res.json({ code: 403, msg: '新增菜单错误' })
        } else {
            res.json({ code: 200, msg: '新增菜单成功' })
        }
    })
}
//删除菜单 
exports.delNavMenu = (req, res) => {
    let obj = req.query.data;
    //设置为存入数组中
    obj = obj instanceof Array ? obj : [obj];
    optionsModel.delNavMenu (obj, (err) => {
        if (err) {
            res.json({ code: 403, msg: '删除菜单错误' })
        } else {
            res.json({ code: 200, msg: '删除菜单成功' })
        }
    })
}
//网站设置的显示
exports.getAllOptions = (req, res) => {
    optionsModel.getAllOptions((err, data) => {
        if (err) {
            res.json({ code: 403, msg: '获取数据错误' })
        } else {
            res.json({ code: 200, msg: '获取数据成功', data })
        }
    })
}