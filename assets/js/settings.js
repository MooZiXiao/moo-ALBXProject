$(function(){
    //显示
    $.ajax({
        url: '/getAllOptions',
        dataType: 'json',
        success: function(res){
            if(res.code === 200){
                $('form').html(template('settingsTemp', res))
            }
        }
    })
})