$(function(){
    $('.exit').on('click', function(){
        $.ajax({
            url: '/exit',
            success: function(res){
                //回登录页
                location.href = '/admin/login'
            }
        })
    })
})