//引入
const userModel = require('../model/userModel');
//登录
exports.login = (req, res) => {
    let obj = req.body;
    userModel.login(obj.email, (err, result) => {
        if(err){
            res.json({code: 400, msg: '服务器错误'});
        }else{
            if(!result){
                res.json({code: 400, msg: '邮箱错误'});
            }else{
                if(result.password === obj.password){
                    req.session.isLogin = 'true';
                    req.session.currentUser = result;
                    res.json({code: 200, msg: '登录成功'});
                }else{
                    res.json({code: 400, msg: '密码错误'});
                }
            }
        }
    })
}
//用户表信息显示
exports.getAllUsers = (req, res) => {
    userModel.getAllUsers((err, data) => {
        if(err){
            res.json({code: 403, msg: '获得数据错误'});
        }else{
            res.json({code: 200, msg: '获得数据成功', data});
        }
    })
}
//邮箱是否存在
exports.getUserEmail = (req, res) => {
    let obj = req.query.email
    userModel.login(obj, (err, result) => {
        if(err){
            res.json({code: 403, msg: '获得数据错误'});
        }else{
            if(result){
                res.json({code: 403, msg: '邮箱已存在'});
            }else{
                res.json({code: 200, msg: '邮箱可以使用'});
            }
        }
    })
} 
//添加用户
exports.addUser = (req, res) => {
    let obj = req.body;
    obj.avatar = '/uploads/avatar.jpg';
    obj.status = 'activated'
    userModel.addUser(obj, (err) => {
        console.log(err)
        if(err){
            res.json({code: 403, msg: '获得数据错误'});
        }else{
            res.json({code: 200, msg: '获得数据成功'});
        }
    })
}
//编辑用户
exports.editUser = (req, res) => {
    let obj = req.body;
    userModel.editUser(obj, (err) => {
        if(err){
            res.json({code: 403, msg: '编辑数据失败'});
        }else{
            res.json({code: 200, msg: '编辑数据成功'});
        }
    })
}
//删除用户
exports.delUserById = (req, res) => {
    let id = req.query.data;
    console.log(id)
    userModel.delUserById(id, (err) => {
        if(err){
            res.json({code: 403, msg: '删除数据失败'});
        }else{
            res.json({code: 200, msg: '删除数据成功'});
        }
    })
}