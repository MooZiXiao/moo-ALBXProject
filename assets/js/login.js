$(function(){
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    //交互判断
    let regx = new regxFun();
    regx.add(email, [
        {
            funName: 'isEmpty',
            msg: '邮箱不能为空'
        },
        {
            funName: 'isEmail',
            msg: '请输入正确的邮箱格式'
        }
    ])
    regx.add(password, [
        {
            funName: 'isEmpty',
            msg: '密码不能为空'
        }
    ])

    //点击登录
    $('.btnLogin').on('click', function(){
        let errMsg = regx.start();
        if(errMsg){
            $('.alert-danger span').text(errMsg);
            $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
        }else{
            $.ajax({
                type: 'post',
                url: '/login',
                data: $('form').serialize(),
                success: function(res){
                    if(res.code === 200){
                        location.href = '/admin';
                    }else{
                        $('.alert-danger span').text(res.msg);
                        $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
                    }
                }
            })
        }
    })
})