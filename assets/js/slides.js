$(function(){
    function init(){
        $.ajax({
            url: '/getSlides',
            success: function(res){
                console.log(res)
                if(res.code === 200){
                    $('tbody').html(template('slidesTemp', res.data))
                }else{
                    $('.alert-danger span').text(res.msg);
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
                }
            }
        })
    }
    init();

    //图片上传
    $('#image').on('change', function(){
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
                    $('.thumbnail').attr('src', '/uploads/' + res.img).show();
                    $('#imageHide').val(res.img)
                }
            }
        })
    })
    //添加
    $('.btnAdd').on('click', function(){
        if($('#text').val().length === 0){
            $('.alert-danger span').text('文本不能为空');
            $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
        }else{
            console.log($('form').serialize())
            $.ajax({
                type: 'post',
                url: '/addSlides',
                data: $('form').serialize(),
                success: function(res){
                    if(res.code === 200){
                        init();
                        $('.thumbnail').hide();
                        $('#imageHide').val('')
                        $('#text').val('');
                        $('#link').val('');
                    }else{
                        $('.alert-danger span').text(res.msg);
                        $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
                    }
                }
            })
        }
    })
    //删除
    $('tbody').on('click', '.btnDel', function(){
        let data = $(this).data();
        opt(data)
    })
    //全选
    $('.ckAll').on('click', function(){
        let statu = $(this).prop('checked');
        $('tbody').find('.ck').prop('checked', statu);
        if($('tbody').find('.ck:checked').length > 1){
            $('.btnDels').fadeIn(500);
        }else{
            $('.btnDels').fadeOut(500);
        }
    })
    //单选
    $('tbody').on('click', '.ck', function(){
        let ckCnt = $('tbody').find('.ck:checked').length;
        $('.ckAll').prop('checked', ckCnt === $('tbody').find('.ck').length);
        if(ckCnt > 1){
            $('.btnDels').fadeIn(500);
        }else{
            $('.btnDels').fadeOut(500);
        }
    })
    //批量删除
    $('.btnDels').on('click', function(){
        let ckArr = $('tbody').find('.ck:checked');
        let data = [];
        for(let i = 0; i < ckArr.length; i++){
            data.push($(ckArr[i]).data());
        }
        opt(data)
    })
    function opt(data){
        if(confirm('确定要删除吗')){
            $.ajax({
                url: '/delSlides',
                data: {data},
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