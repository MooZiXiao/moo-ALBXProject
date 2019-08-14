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
                    $('#link').val('');
                }else{
                    $('.alert-danger span').text(res.msg);
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
                }
            }
        })
    })
    //删除
})