$(function () {
    //存储错误提示
    let errMsg = ''
    let old = document.getElementById('old')
    let password = document.getElementById('password');
    let confirm = document.getElementById('confirm');

    $(old).focus()
    let regx = new regxFun();
    regx.add(old, [
        {
            funName: 'isEmpty',
            msg: '旧密码不能为空'
        }, {
            funName: 'minLength:3',
            msg: '旧密码不能少于3位'
        }
    ])

    //判断旧密码是否一致
    $('#old').on('change', function () {
        let errMsg = regx.start()
        if (errMsg) {
            $('.alert-danger span').text(errMsg);
            $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
            $(old).focus()
        } else {
            $.ajax({
                url: '/getCurrentUserPwd?password=' + $('#old').val(),
                success: function (res) {
                    if (res.code !== 200) {
                        $('.alert-danger span').text(res.msg);
                        $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
                        $(old).focus()
                    }
                }
            })
        }
    })
    //密码验证
    $(password).on('change', function () {
        regx.add(password, [
            {
                funName: 'isEmpty',
                msg: '新密码不能为空'
            }, {
                funName: 'minLength:3',
                msg: '新密码不能少于3位'
            }
        ])
        errMsg = regx.start()
        if (errMsg) {
            $('.alert-danger span').text(errMsg);
            $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
            if (errMsg.indexOf('少于3位') || errMsg.indexOf('空')) {
                $(password).focus()
            }
        }else{
            if ($(confirm).val()) {
                if($(confirm).val() !== $(password).val()){
                    errMsg = '两次密码不一致，请重新确认'
                    $('.alert-danger span').text(errMsg);
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
                }
            }
        }
    })
    //判断两次密码是否一致
    $(confirm).on('change', function () {
        regx.add(confirm, [
            {
                funName: 'isEmpty',
                msg: '确认新密码不能为空'
            }, {
                funName: 'minLength:3',
                msg: '确认新密码不能少于3位'
            }
        ])
        errMsg = regx.start()
        if (errMsg) {
            $('.alert-danger span').text(errMsg);
            $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
            if (errMsg.indexOf('少于3位') || errMsg.indexOf('空')) {
                $(confirm).focus()
            }
        }else{
            if($(confirm).val() !== $(password).val()){
                errMsg = '两次密码不一致，请重新确认'
                $('.alert-danger span').text(errMsg);
                $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
            }
        }
    })
    //修改
    $('.btnEidt').on('click', function () {
        if (errMsg) {
            $('.alert-danger span').text(errMsg);
            $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
        } else {
            $.ajax({
                type: 'post',
                url: '/editCurrentUserByEmail',
                data: { password: $(confirm).val() },
                success: function (res) {
                    if (res.code === 200) {
                        $.ajax({
                            url: '/exit',
                            success: function(res){
                                //回登录页
                                location.href = '/admin/login'
                            }
                        })
                    } else {
                        $('.alert-danger span').text(res.msg);
                        $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
                    }
                }
            })
        }
    })
})