$(function(){
    //显示
    function init(){
        $.ajax({
            url: '/getCurrentUserByEmail',
            success: function(res){
                if(res.code === 200){
                    $('.form-image img').attr('src', res.data.avatar);
                    $('#email').val(res.data.email);
                    $('#slug').val(res.data.slug);
                    $('#nickname').val(res.data.nickname);
                    $('#bio').val(res.data.bio);
                    $('#imgHide').val(res.data.avatar);
                }
            }
        })
    }
    init()
    //图片上传
    $('#avatar').on('change', function(){
        let file = this.files[0];
        let fd = new FormData();
        fd.append('img', file);
        $.ajax({
            type: 'post',
            url: '/uploadFile',
            data: fd, 
            contentType: false,
            processData: false,
            success: function(res){
                if(res.code === 200){
                    $('.form-image img').attr('src', '/uploads/' + res.img);
                    $('#imgHide').val(res.img)
                }else{
                    $('.alert-danger span').text(res.msg);
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
                }
            }
        })
    })
    let slugErrMsg = '';
    //验证别名
    $('#slug').on('blur', function(){
        $.ajax({
            url: '/getCurrentUserSlug?slug=' + $('#slug').val(),
            success: function(res){
                if(res.code !== 200){
                    $('.alert-danger span').text(res.msg);
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
                    slugErrMsg = res.msg
                }
            }
        })
    })
    let nickname = document.getElementById('nickname')
    let regx = new regxFun();
    regx.add(nickname, [
        {
            funName: 'isEmpty',
            msg: '昵称不能为空'
        },{
            funName: 'minLength:2',
            msg: '昵称不能少于2位'
        }
    ])
    //修改
    $('.btnSave').on('click', function(){
        //验证
        let errMsg = regx.start();
        if(slugErrMsg){
            $('.alert-danger span').text(slugErrMsg);
            $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
        }else{
            if(errMsg){
                $('.alert-danger span').text(errMsg);
                $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
            }else{
                $.ajax({
                    type: 'post',
                    url: '/editCurrentUserByEmail',
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
    })
})