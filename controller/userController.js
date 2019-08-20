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
    userModel.delUserById(id, (err) => {
        if(err){
            res.json({code: 403, msg: '删除数据失败'});
        }else{
            res.json({code: 200, msg: '删除数据成功'});
        }
    })
}
//用户别名
exports.getUserSlug = (req, res) => {
    let slug = req.query.slug
    userModel.getUserSlug(slug, (err, data) => {
        if(err){
            res.json({code: 403, msg: '获得数据错误'});
        }else{
            if(data){
                res.json({code: 403, msg: '用户别名已存在'});
            }else{
                res.json({code: 200, msg: '用户别名可以使用'});
            }
        }
    })
}
//根据登录的email也是可以的
//获得当前用户
exports.getCurrentUserByEmail = (req, res) => {
    let email = req.session.currentUser.email
    userModel.login(email, (err, data) => {
        if(err){
            res.json({code: 403, msg: '获得数据错误'});
        }else{
            res.json({code: 200, msg: '获得数据成功', data});
        }
    })
}
//当前用户别名
exports.getCurrentUserSlug = (req, res) => {
    let slug = req.query.slug
    let oldSlug = req.session.currentUser.slug
    userModel.getUserSlug(slug, (err, data) => {
        if(err){
            res.json({code: 403, msg: '获得数据错误'});
        }else{
            if(data){
                if(data.slug == oldSlug){
                    res.json({code: 200, msg: '用户别名没有修改，与上次一致'});
                }else{
                    res.json({code: 403, msg: '用户别名已存在'});
                }
            }else{
                res.json({code: 200, msg: '用户别名可以使用'});
            }
        }
    })
}
//编辑当前用户信息
exports.editCurrentUserByEmail = (req, res) => {
    let obj = req.body;
    obj.email = req.session.currentUser.email;
    userModel.editUser(obj, (err) => {
        if(err){
            res.json({code: 403, msg: '修改数据错误'});
        }else{
            res.json({code: 200, msg: '修改数据成功'});
        }
    })
}
//获得当前用户的密码
exports.getCurrentUserPwd = (req, res) => {
    let password = req.query.password;
    let email = req.session.currentUser.email
    userModel.login(email, (err, data) => {
        if(err){
            res.json({code: 403, msg: '获得数据错误'});
        }else{
            if(data.password === password){
                res.json({code: 200, msg: '旧密码正确'});
            }else{
                res.json({code: 403, msg: '旧密码不正确'});
            }
        }
    })
}
//退出
exports.exit = (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login')
}