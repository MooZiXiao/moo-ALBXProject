$(function(){
    let pageNum = 1;
    let pageSize = 3;
    //显示
    function init() {
        $.ajax({
            url: '/getAllComments',
            data: {
                pageNum: pageNum,
                pageSize: pageSize
            },
            success: function(res){
                if(res.code === 200){
                    $('tbody').html(template('commentsTemp', res.data));
                    setPage(Math.ceil(res.data.total / pageSize));
                }
            }
        })
    }
    init();

    //分页显示
    function setPage(cnt){
        $('.pagination').bootstrapPaginator({
            //设置版本号
            bootstrapMajorVersion: 3,
            // 显示第几页
            currentPage: pageNum,
            // 总页数
            totalPages: cnt,
            //单击操作
            onPageClicked: function (event,originalEvent,type,page) {
                pageNum = page;
                init()
            }
        })
    }
    //批准
    $('tbody').on('click', '.btnSave', function(){
        let id = $(this).data('id');
        updateAjax(id);
    })
    //单条删除
    $('tbody').on('click', '.btnDel', function(){
        let id = $(this).data('id');
        delAjax(id)
    })
    //全选
    $('.ckAll').on('click', function(){
        let statu = $(this).prop('checked');
        $('tbody').find('.ck').prop('checked', statu);
        if($('tbody').find('.ck:checked').length > 1){
            $('.btn-batch').fadeIn(500)
        }else{
            $('.btn-batch').fadeOut(500)
        }
    })
    //单选
    $('tbody').on('click', '.ck', function(){
        let cnt = $('tbody').find('.ck:checked').length;
        $('.ckAll').prop('checked', cnt === $('tbody').find('.ck').length);
        if(cnt > 1){
            $('.btn-batch').fadeIn(500)
        }else{
            $('.btn-batch').fadeOut(500)
        }
    })

    //批量批准
    $('.btnSaves').on('click', function(){
        let id = setId().join(',');
        updateAjax(id)
    })
    //批量拒绝
    $('.btnRefuces').on('click', function(){
        let id = setId().join(',');
        if(confirm('确定要批准吗')){
            $.ajax({
                url: '/editComStatusRefuceById?id=' + id,
                success: function(res){
                    if(res.code === 200){
                        init()
                    }else{
                        $('.alert-danger span').text(res.msg);
                        $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                    }
                }
            })
        }
    })
    //批量删除
    $('.btnDels').on('click', function(){
        let id = setId().join(',');
        delAjax(id)
    })
    //获得id
    function setId (){
        let ckCnt = $('tbody').find('.ck:checked');
        let id = [];
        for(let i = 0; i < ckCnt.length; i++){
            id.push($(ckCnt[i]).data('id'))
        }
        return id
    }
    //批准ajax
    function updateAjax(id){
        if(confirm('确定要批准吗')){
            $.ajax({
                url: '/editComStatusAgreeById?id=' + id,
                success: function(res){
                    if(res.code === 200){
                        init()
                    }else{
                        $('.alert-danger span').text(res.msg);
                        $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                    }
                }
            })
        }
    }
    //删除ajax
    function delAjax(id){
        if(confirm('确定要删除吗')){
            $.ajax({
                url: '/delCommentsStatusById?id=' + id,
                success: function(res){
                    if(res.code === 200){
                        if($('tbody').find('tr').length === 1){
                            if(pageNum > 1){
                                pageNum --
                            }
                        }
                        init()
                    }else{
                        $('.alert-danger span').text(res.msg);
                        $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500)
                    }
                }
            })
        }
    }
})