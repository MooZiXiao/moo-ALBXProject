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