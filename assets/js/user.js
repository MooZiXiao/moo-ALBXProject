$(function(){
    //显示
    function init(){
        $.ajax({
            url: '/getAllUsers',
            success: function(res){
                if(res.code === 200){
                    $('tbody').html(template('userTemp', res.data))
                }
            }
        })
    }
    init();

    let email = document.getElementById('email')
    let password = document.getElementById('password')
    let regx = new regxFun();
    regx.add(email, [
        {
            funName: 'isEmpty',
            msg: '邮箱不能为空'
        },{
            funName: 'isEmail',
            msg: '请正确输入邮箱'
        }
    ])
    regx.add(password, [
        {
            funName: 'isEmpty',
            msg: '密码不能为空'
        }
    ])   
    let emailErrMsg = '';
    //判断邮箱是否存在 
    $('#email').on('blur', function(){
        $.ajax({
            url: '/getUserEmail?email=' + $('#email').val(),
            success: function(res){
                if(res.code !== 200){
                    $('.alert-danger span').text(res.msg);
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
                    emailErrMsg = res.msg;
                }
            }
        })
    })
    let slugErrMsg = '';
    //验证别名
    $('#slug').on('blur', function(){
        $.ajax({
            url: '/getUserSlug?slug=' + $('#slug').val(),
            success: function(res){
                if(res.code !== 200){
                    $('.alert-danger span').text(res.msg);
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
                    slugErrMsg = res.msg;
                }
            }
        })
    })
    //添加
    $('.btnAdd').on('click', function(){
        //交互判断
        opt('/addUser')
    })
    //编辑
    $('tbody').on('click', '.btnedit', function(){
        let data = $(this).data();
        $('#email').val(data.email);
        $('#slug').val(data.slug);
        $('#nickname').val(data.nickname);
        $('#password').val(data.password)

        $('.btnAdd').hide();
        $('.btnEdit').show();
        $('form h2').text('编辑用户信息')
    })
    $('.btnEdit').on('click', function(){
        opt('/editUser')
    })
    function opt(url){
        let errMsg = regx.start();
        if(emailErrMsg){
            $('.alert-danger span').text(emailErrMsg);
            $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
        }else if(slugErrMsg) {
            $('.alert-danger span').text(slugErrMsg);
            $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
        }else{
            if(errMsg){
                $('.alert-danger span').text(errMsg);
                $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
            }
            else{
                $.ajax({
                    type:'post',
                    url: url,
                    data: $('form').serialize(),
                    success: function(res){
                        if(res.code === 200){
                            init()
                        }else{
                            $('.alert-danger span').text(res.msg);
                            $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
                        }
                    }
                })
            }
        }
    }
    //删除
    $('tbody').on('click', '.btndel', function(){
        let id = $(this).data('id');
        delOpt(id)
    })
    //全选
    $('.ckAll').on('click', function(){
        let statu = $(this).prop('checked');
        $('tbody').find('.ck').prop('checked', statu);
        if($('tbody').find('.ck:checked').length > 1){
            $('.btnDels').fadeIn(500)
        }else{
            $('.btnDels').fadeOut(500)
        }
    })
    //单选
    $('tbody').on('click', '.ck', function(){
        let count = $('tbody').find('.ck:checked').length;
        $('.ckAll').prop('checked', count === $('tbody').find('.ck').length)
        if(count > 1){
            $('.btnDels').fadeIn(500)
        }else{
            $('.btnDels').fadeOut(500)
        }
    })
    //批量删除
    $('.btnDels').on('click', function(){
        let isck = $('tbody').find('.ck:checked');
        let data = [];
        console.log(isck)
        for(let i = 0; i < isck.length; i++){
            data.push($(isck[i]).data('id'))
        }
        let id = data.join(',');
        delOpt(id)
    })
    function delOpt(id){
        if(confirm('确定要删除吗')){
            $.ajax({
                url: '/delUserById',
                data: {data:id},
                success: function(res){
                    if(res.code === 200){
                        init()
                    }else{
                        $('.alert-danger span').text(res.msg);
                        $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
                    }
                }
            })
        }
    }
})