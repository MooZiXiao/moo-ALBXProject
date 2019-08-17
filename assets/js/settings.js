$(function(){
    //显示
    function init(){
        $.ajax({
            url: '/getAllOptions',
            dataType: 'json',
            success: function(res){
                if(res.code === 200){
                    $('form').html(template('settingsTemp', res))
                }
            }
        })
    }
    init();
    //图片上传
    $('form').on('change', '#logo', function(){
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
                    $('form').find('#site_logo').val(res.img);
                    $('form').find('.form-image img').attr('src', '/uploads/' + res.img);
                }
            }
        })
    })

    //保存
    $('form').on('click', '.btnSave', function(){
        // console.log($('form').serialize())
        if($('form').find('#site_name').val().length === 0){
            $('.alert-danger span').text('站点名称不能为空');
            $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
        }else{
            $.ajax({
                type: 'post',
                url: '/updateOptions',
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
    })
})