$(function(){
    let pageNum = 1;
    let pageSize = 3;
    let params = {};
    function init(){
        $.ajax({
            url: '/getAllPosts',
            data: {
                pageNum: pageNum,
                pageSize: pageSize,
                ...params
            },
            success: function(res){
                if(res.code === 200){
                    let html = template('postsTemp', res.data);
                    $('tbody').html(html);
                    console.log(res.data.total)
                    console.log($('tbody').find('tr').length)
                    if($('tbody').find('tr').length === 0){
                        setPage(1);
                        $('.container-fluid').append('<h3 style="text-align:center">抱歉，找不出你要筛选的数据噢...</h3>')
                    }else{
                        $('.container-fluid').find('h3').remove();
                        setPage(Math.ceil(res.data.total / pageSize));
                    }
                }
            }
        })
    }
    init();

    //分页
    function setPage(count){
        $('.pagination').bootstrapPaginator({
            bootstrapMajorVersion: 3,
            currentPage: pageNum,
            totalPages: count,
            onPageClicked: function (event,originalEvent,type,page) {
                pageNum = page;
                init();
            }
        })
    }

    //分类
    $.ajax({
        url: '/getAllCategories',
        success: function(res){
            if(res.code === 200){
                let html = '<option value="all">所有分类</option>';
                for(let i = 0; i < res.data.length; i++){
                    html += `<option value="${res.data[i].id}">${res.data[i].name}</option>`;
                }
                $('.showCate').html(html);
            }
        }
    })
    //筛选
    $('.btnSelector').on('click', function(){
        params.cate = $('.showCate').val();
        params.status = $('.showStatu').val();

        init(params);
    })

    //删除
    $('tbody').on('click', '.btnDel', function(){
        let id = $(this).data('id');
        if(confirm('确定要删除吗？')){
            $.ajax({
                url: '/delPostById?id=' + id,
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

    //全选、全不选
    $('.ckAll').on('change', function(){
        let statu = $(this).prop('checked');
        $('tbody').find('.ck').prop('checked', statu);
        if($('tbody').find('.ck:checked').length > 1){
            $('.btnSome').show(500);
        }else{
            $('.btnSome').hide(500);
        }
    })
    //单选
    $('tbody').on('change', '.ck', function(){
        let count = $('tbody').find('.ck:checked').length;
        $('.ckAll').prop('checked', count === $('tbody').find('.ck').length);
        if(count > 1){
            $('.btnSome').show(500);
        }else{
            $('.btnSome').hide(500);
        }
    })
    //批量删除
    $('.btnSome').on('click', function(){
        //获得选中的id
        let isChecked = $('tbody').find('.ck:checked');
        let arr = [];
        for(let i = 0; i < isChecked.length; i++){
            arr.push($(isChecked[i]).data('id'));
        }
        if(confirm('确定要删除吗？')){
            $.ajax({
                url: '/delPostById',
                data: {id: arr.join(',')},
                success: function(res){
                    if(res.code === 200){
                        $('.btnSome').hide();
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