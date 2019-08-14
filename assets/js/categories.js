$(function(){
    //显示
    function init(){
        $.ajax({
            url: '/getAllCategories',
            success: function(res) {
                if(res.code === 200){
                    $('tbody').html(template('cateTemp', res.data))
                }
            }
        })
    }
    init();
    //添加
    $('.btnAdd').on('click', function(){
        $.ajax({
            type: 'post',
            url: '/addCate',
            data: $('form').serialize(),
            success: function(res){
                if(res.code === 200){
                    init();
                }else{
                    $('.alert-danger span').text(res.msg);
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
                }
            }
        })
    })
    //点击列表的编辑按钮，将数据加载到对应文本框中
    $('tbody').on('click', '.btnEdit', function(){
        let data = $(this).data();
        $('#id').val(data.id);
        $('#name').val(data.name);
        $('#slug').val(data.slug);
        //更改标题
        $('form h2').text('编辑分类目录');
        //按钮显示
        $('.btnAdd').hide();
        $('.btnedit').show();
    })
    //编辑
    $('.btnedit').on('click', function(){
        $.ajax({
            type: 'post',
            url: '/editCateById',
            data: $('form').serialize(),
            success: function(res){
                if(res.code === 200){
                    init();
                    //回到原来的状态
                    $('#name').val('');
                    $('#slug').val('');
                    $('form h2').text('添加新分类目录');
                    //按钮显示
                    $('.btnAdd').show();
                    $('.btnedit').hide();
                }else{
                    $('.alert-danger span').text(res.msg);
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
                }
            }
        })
    })

    //删除
    $('tbody').on('click', '.btnDel', function(){
        let id = $(this).data('id');
        console.log(id)
        if(confirm('确定要删除吗？')){
            $.ajax({
                url: '/delCateById?id=' + id,
                success: function(res){
                    if(res.code === 200){
                        init();
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
        let count = $('tbody').find('.ck:checked').length;
        $('.ckAll').prop('checked', count === $('tbody').find('.ck').length);
        if($('tbody').find('.ck:checked').length > 1){
            $('.btnDels').fadeIn(500);
        }else{
            $('.btnDels').fadeOut(500);
        }
    })
    //批量删除
    $('.btnDels').on('click', function(){
        let ischecked = $('tbody').find('.ck:checked');
        let arr = [];
        for(let i=0; i<ischecked.length; i++){
            arr.push($(ischecked[i]).data('id'));
        };
        if(confirm('确定要删除吗？')){
            $.ajax({
                url: '/delCateById?id=' + arr.join(','),
                success: function(res){
                    if(res.code === 200){
                        init();
                    }else{
                        $('.alert-danger span').text(res.msg);
                        $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
                    }
                }
            })
        }
    })
})