$(function(){
    $.ajax({
        url: '/getAllPosts',
        success: function(res){
            console.log(res)
            if(res.code === 200){
                let html = template('postsTemp', res.data);
                $('tbody').html(html);
            }
        }
    })
})