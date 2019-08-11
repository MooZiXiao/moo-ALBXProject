$(function(){
    //上传
    $('#feature').on('change', function(){
        let file = this.files[0];
        let fd = new FormData();
        fd.append('img', file);
        $.ajax({
            type: 'post',
            url: '/uploadFile',
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if(res.code === 200){
                    $('.thumbnail').attr('src', '/uploads/' + res.img).show();
                    $('#hiddenImg').val(res.img);
                }else{
                    $('.alert-danger span').text(res.msg);
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
                }
            }
        })
    })

    //富文本框
    CKEDITOR.replace('content');

    //分类加载
    $.ajax({
        url: '/getAllCategories',
        success: function(res){
            if(res.code === 200){
                let html = '';
                for(let i = 0; i < res.data.length; i++){
                    html += `<option value="${res.data[i].id}">${res.data[i].name}</option>`;
                }
                $('#category').html(html);
            }
        }
    })

    //别名不能一致
    $('#slug').on('blur', function(){
        $.ajax({
            url: '/checkSlugInPost',
            data: {slug: $('#slug').val()},
            success: function(res){
                if(res.code === 403){
                    $('.alert-danger span').text(res.msg);
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
                }
            }
        })
    })

    let title = document.getElementById('title');
    let content = document.getElementById('content');
    let slug = document.getElementById('slug');

    if(location.href.indexOf('?') === -1){
        //新增
        $('.btnSave').on('click', function(){
            opt('/addPost')
        })
    }else{
        let id = getUrlSearch().id;
        $('.page-title h1').text('编辑文章');
        //显示
        $.ajax({
            url: '/getPostById?id=' + id,
            success: function(res){
                if(res.code === 200){
                    $('#title').val(res.data.title);
                    $('#content').val(res.data.content);
                    $('#slug').val(res.data.slug);
                    $('.thumbnail').attr('src', '../uploads/' + res.data.feature).show();
                    $('#category').val(res.data.category_id);
                    $('#created').val(res.data.created);
                    $('#status').val(res.data.status);
                    //隐藏域
                    $('#id').val(res.data.id);
                    $('#hiddenImg').val(res.data.feature);
                }
            }
        })
        //编辑
        $('.btnSave').on('click', function(){
            opt('/editPost')
        })
    }

    function opt(url){
        //富文本框处理
        CKEDITOR.instances.content.updateElement();
        //交互判断
        let regx = new regxFun();
        regx.add(title, [
            {
                funName: 'isEmpty',
                msg: '标题不能为空'
            }
        ])
        regx.add(content, [
            {
                funName: 'isEmpty',
                msg: '内容不能为空'
            }
        ])
        regx.add(slug, [
            {
                funName: 'isEmpty',
                msg: '别名不能为空'
            }
        ])
        let errMsg = regx.start();

        if(errMsg){
            $('.alert-danger span').text(errMsg);
            $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
        }else{
            $.ajax({
                type: 'post',
                url: url,
                data: $('form').serialize(),
                success: function(res){
                    if(res.code === 200){
                        location.href = '/admin/posts'
                    }else{
                        $('.alert-danger span').text(res.msg);
                        $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
                    }
                }
            })
        }
    }
})