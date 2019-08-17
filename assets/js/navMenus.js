$(function(){
    //显示
    init();
    function init(){
        $.ajax({
            url: '/getNavMenus',
            success: function(res){
                if(res.code === 200){
                    $('tbody').html(template('navMenusTemp', res.data))
                }
            }
        })
    }
    //添加
    $('.btnAdd').on('click', function(){
        if($('#text').val().length === 0){
            $('.alert-danger span').text('文本不能为空');
            $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
        }else{
            $.ajax({
                type: 'post',
                url: '/addNavMenus', 
                data: $('form').serialize(),
                success: function (res) {
                        console.log($('form').serialize())
                    if(res.code === 200){
                        init();
                        $('#text').val('');
                        $('#title').val('');
                        $('#href').val('');
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
        let title = $(this).data('title');
        // console.log(data)
        if(confirm('确定要删除吗')){
            $.ajax({
                url: '/delNavMenu',
                data: {data: title},
                dataType: 'json',
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
        let isck = $('tbody').find('.ck:checked').length;
        $('.ckAll').prop('checked', isck === $('tbody').find('.ck').length);
        if(isck > 1){
            $('.btnDels').fadeIn(500);
        }else{
            $('.btnDels').fadeOut(500);
        }
    })
    
    //批量删除
    $('.btnDels').on('click', function(){
        let ckMore = $('tbody').find('.ck:checked');
        // console.log(ckMore)
        let arr = [];
        for(let i = 0; i < ckMore.length; i++){
            arr.push($(ckMore[i]).data('title'))
        }
        console.log(arr)
        if(confirm('确定要删除吗')){
            $.ajax({
                url: '/delNavMenu',
                data: {data: arr},
                dataType: 'json',
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