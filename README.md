# ALBX Project

###1.基本架构

- assets 文件夹
  - css
  - img
  - vendors引用的插件
- views 文件夹
  - 前台页面
  - 后台页面（admin)
- uploads 文件夹（上传）

### 2.MVC基本的搭建

- app.js （express）
- router.js（express.Router()）
- controller 文件夹
- model 文件夹

### 3.使用ejs模板引擎渲染前台及后台界面并抽离后台公共结构

- app.js

  ```js
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');
  ```

- layouts 文件夹 （后台公共部分抽离存储的文件夹）
  - admin-header.ejs
  - admin-navbar.ejs
  - admin-aside.ejs
  - admin-footer.ejs

### 4.用户登录

- utils 文件夹

  - sqlHelpper.js

    ```js
    //mysql
    const mysql = require('mysql');
    //创建连接
    const conn = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'moo-albx',
        dateStrings: true
    })
    module.exports = conn;
    ```

- 后台

  - app（状态保持及守卫导航）

    ```js
    //session
    app.use(session({
        secret: 'moo-albx',
        resave: false,
        saveUninitialized: false
    }))
    
    //全局中间件
    app.use(function(req, res, next){
        if(req.session.isLogin && req.session.isLogin === 'true' || req.url === '/admin/login' || req.url.indexOf('/admin') === -1){
            next();
        }else{
            res.redirect('/admin/login');
        }
    })
    ```

    

  - router

    ```js
    .post('/login', userController.login)
    ```

  - userController

    ```js
    userModel.login(obj.email, 回调函数)
    ```

  - userModel

    ```js
    exports.login = (email, callback) => {
        let sql =  'select * from users where email=?';
        conn.query(sql, email, (err, result) => {
            if(err){
                callback(err);
            }else{
                callback(null, result[0]);
            }
        })
    }
    ```

    

- 前台

  - 交互判断 （状态模式）
  - 发送ajax请求

### 5.admin-aside正确导航

- 获得当前路由名称

```js
getRouterName(href) {
        let routerName = '';
        if (href.indexOf('?') === -1) {
            routerName = href.substring(href.lastIndexOf('/') + 1);
        } else {
            routerName = href.substring(href.lastIndexOf('/') + 1, href.indexOf('?'));
        }
        return routerName;
    }
```

- aside.js

  ```js
  let routerName = kits.getRouterName(location.href);
  if(routerName === 'posts' || routerName === 'post-add' || routerName === 'categories'){
      $('#menu-posts').addClass('in').attr('aria-expanded', true);
      $('#menu-posts').siblings('a').removeClass('collapsed');
  }
  if(routerName === 'nav-menus' || routerName === 'slides' || routerName === 'settings'){
  	$('#menu-settings').addClass('in').attr('aria-expanded', true);
  	$('#menu-settings').siblings('a').removeClass('collapsed');
  }
  $('li').removeClass('active');
  $('#' + routerName).addClass('active');
  ```

### 6.文章的显示

- 后台

  - router

    ```js
    .get('/getAllPosts', postsController.getAllPosts)
    ```

  - postsController

    ```js
    //全部文章的显示
    exports.getAllPosts = (req, res) => {
        postsModel.getAllPosts((err, data) => {
            if(err){
                res.json({code: 400, msg: '获取文章错误'})
            }else{
                res.json({code: 200, msg: '获取文章成功', data: data})
            }
        })
    }
    ```

  - postsModel

    ```js
    //获得全部文章
    exports.getAllPosts = (callback) => {
        let sql = `select p.*, u.nickname, c.name from posts p
                    join users u
                    join categories c
                    on p.user_id = u.id and p.category_id = c.id
                    where p.isDel = 0 `;
        conn.query(sql, (err, result) => {
            if (err) {
                callback(err);
            } else {
                callback(null, result);
            }
        })
    }
    ```

- 前台
  
  - ajax 显示全部文章

### 7.文章的分页及筛选

- 后台

  - router

  - postsController

  - postsModel

    ```js
    //获得全部文章
    exports.getAllPosts = (obj, callback) => {
        let sql = `select p.*, u.nickname, c.name from posts p
                    join users u
                    join categories c
                    on p.user_id = u.id and p.category_id = c.id
                    where p.isDel = 0 `;
        //筛选
        if(obj.cate && obj.cate!== 'all'){
            sql += ` and p.category_id = ${obj.cate} `;
        }
        if(obj.status && obj.status !== 'all'){
            sql += ` and p.status = '${obj.status}' `;
        }
        sql += ` order by p.id desc
                limit ${(obj.pageNum-1) * obj.pageSize}, ${obj.pageSize}`;
        conn.query(sql, (err, result) => {
            if (err) {
                callback(err);
            } else {
            	//总数
                sql = `select count(*) cnt from posts p
                        join users u
                        join categories c
                        on p.user_id = u.id and p.category_id = c.id
                        where p.isDel = 0 `;
                if(obj.cate && obj.cate !== 'all'){
                    sql += ` and p.category_id = ${obj.cate} `;
                }
                if(obj.status && obj.status !== 'all'){
                    sql += ` and p.status = '${obj.status}' `;
                }
                conn.query(sql, (err2, res2) => {
                    if(err2){
                        callback(err2);
                    }else{
                        callback(null, {data: result, total: res2[0].cnt});
                    }
                })
            }
        })
    ```

    

- 前台

  - ajax

  - bootsrap分页插件

    ```js
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
    ```

  - 分类 （由于在筛选的条件中需要加载分类的数据，则需要在后台设置好分类的路由，控制器及数据层，此处略）

    ```js
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
    ```

### 8.文章的新增含图片上传

- 图片上传

  - 后台

    - router

      ```js
      .post('/uploadFile', uploadController.uploadFile)
      ```

    - uploadController

      ```js
      const formidable = require('formidable');
      const path = require('path');
      exports.uploadFile = (req, res) => {
          let form = formidable.IncomingForm();
          form.encoding = 'utf-8';
          form.uploadDir = __dirname + '../uploads';
          form.keepExtensions = true;
          form.parse(req, (err, fields, files) => {
              if(err){
                  res.json({code: 403, msg: '文件上传失败'})
              }else{
                  let imgName = path.basename(files.img.path);
                  res.json({code: 200, msg: '文件上传成功', img: imgName});
              }
          })
      }
      ```

      

  - 前台

    ```js
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
                }else{
                    $('.alert-danger span').text(res.msg);
                    $('.alert-danger').fadeIn(500).delay(2000).fadeOut(500);
                }
            }
        })
    })
    ```

    

- 后台

  router 

  ```js
  .post('/addPost', postsController.addPost)
  ```

  postsController

  ```js
  //新增文章
  exports.addPost = (req, res) => {
      let obj = req.body;
      obj.id = null;
      obj.user_id = req.session.currentUser.id;
      obj.views = 0;
      obj.likes = 0;
      postsModel.addPost(obj, (err) => {
          if (err) {
              console.log(err)
              res.json({ code: 403, msg: '新增文章错误' })
          } else {
              res.json({ code: 200, msg: '新增文章成功' })
          }
      })
  }
  ```

  postsModel

  ```js
  //新增文章
  exports.addPost = (obj, callback) => {
      let sql = 'insert into posts set ?';
      conn.query(sql, obj, (err, result) => {
          if(err){
              callback(err);
          }else{
              callback(null);
          }
      })
  }
  ```

  

- 前台

  交互判断及发送ajax请求

  ```js
  //新增
  $('.btnSave').on('click', function(){
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
              url: '/addPost',
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
  })
  ```

  

### 9.文章编辑

- 显示

  - 后台

    router（.get('/getPostById', postsController.getPostById)）

    postsController

    ```js
    //获得id对应的文章
    exports.getPostById = (req, res) => {
        let id = req.query.id;
        postsModel.getPostById(id, (err, data) => {
            if (err) {
                res.json({ code: 403, msg: '文章获取失败'})
            } else {
                data.created = moment(data.created).format('YYYY-MM-DDTHH:mm')
                res.json({ code: 200, msg: '文章获取成功', data})
            }
        })
    }
    ```

    postsModel

    ```js
    //获得id对应的文章
    exports.getPostById = (id, callback) => {
        let sql = `select p.*, u.nickname, c.name from posts p
                    join users u
                    join categories c
                    on p.user_id = u.id and p.category_id = c.id
                    where p.isDel = 0 and p.id =` + id;
        conn.query(sql, (err, result) => {
            if(err){
                callback(err);
            }else{
                callback(null, result[0]);
            }
        })
    }
    ```

    

  - 前台

    获得url?后的Id并显示对应数据

    ```js
    let id = getUrlSearch().id;
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
    ```

    

- 编辑

  - 后台

    router（.post('/editPost', postsController.editPost)）

    postsController

    ```js
    //编辑文章
    exports.editPost = (req, res) => {
        let obj = req.body;
        postsModel.editPost(obj, (err) => {
            if (err) {
                res.json({ code: 403, msg: '编辑文章失败' })
            } else {
                res.json({ code: 200, msg: '编辑文章成功' })
            }
        })
    }
    ```

    postsModel

    ```js
    //编辑文章
    exports.editPost = (obj, callback) => {
        let sql = 'update posts set ? where id = ?';
        conn.query(sql, [obj, obj.id], (err, result) => {
            if(err){
                callback(err);
            }else{
                callback(null);
            }
        })
    }
    ```

  - 前台

    ```js
    if(location.href.indexOf('?') === -1){
        //新增
        $('.btnSave').on('click', function(){
            opt('/addPost')
        })
    }else{
        let id = getUrlSearch().id;
        //显示
        代码如上的显示的前台代码
        //编辑
        $('.btnSave').on('click', function(){
            opt('/editPost')
        })
    }
    ```

  - 由于添加与编辑发送的ajax请求大致一样，故将之封装

    ```js
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
    ```

### 10.文章的删除

- 后台

  router（.get('/delPostById', postsController.delPostById)）

  postsController

  ```js
  //根据id删除文章
  exports.delPostById = (req, res) => {
      let id = req.query.id;
      postsModel.delPostById(id, (err) => {
          if (err) {
              res.json({ code: 403, msg: '删除文章失败' })
          } else {
              res.json({ code: 200, msg: '删除文章成功' })
          }
      })
  }
  ```

  postsModel

  ```js
  exports.delPostById = (id, callback) => {
      let sql = 'update posts set isDel=1 where id = ' + id;
      conn.query(sql, (err, result) => {
          if(err){
              callback(err);
          }else{
              callback(null);
          }
      })
  }
  ```

- 前台

  获得id并用委托注册事件

  ```js
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
  ```

### 11.文章批量删除

- 后台

  - postsModel

    ```js
    let sql = `update posts set isDel=1 where id in (${id})`;
    ```

- 前台

  - 全选、全不选

    ```js
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
    ```

  - 单选

    ```js
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
    ```

  - 批量删除

    ```js
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
    ```


###12.加载提示及单条删除的正确显示

- post.js

  init函数中，当数据没有数据或是筛选中没有数据是给出提示

  ```js
  if(res.code === 200){
      let html = template('postsTemp', res.data);
      $('tbody').html(html);
      if($('tbody').find('tr').length === 0){
          $('.container-fluid').find('h3').remove();
          $('.pagination').hide();
          $('.container-fluid').append('<h3 style="text-align:center">抱歉，并没有数据噢...</h3>');
      }else{
          $('.pagination').show();
          $('.container-fluid').find('h3').remove();
          setPage(Math.ceil(res.data.total / pageSize));
      }
  }
  ```

  单条删除

  ```js
  基本事实：删除和刷新是两个操作
  1.如果当前页只有一条记录，那么删除之后就应该加载 上一页的数据
  2.如果当前页有多条记录，那么就直接重新加载这一页
  3.如果是第一页，只有一条记录，那么就给出提示
  if($('tbody>tr').length == 1){
      if(pageNum > 1){
          pageNum --
      }
  }
  ```

  

### 13.分类的显示、添加、编辑、删除、批量删除

- 编辑

  ```html
  //模板的编辑按钮
  <a href="javascript:;" class="btn btn-info btn-xs btnEdit" data-id='{{ val.id }}' data-name='{{ val.name }}' data-slug='{{ val.slug }}'>编辑</a>
  ```

- 由于分类的显示、添加、编辑、删除、批量删除与文章的显示、添加、编辑、删除、批量删除大致一样，故可仿照上面文章的思想编写。

### 14.网站导航菜单

####   新增

- 后台

  router

  ```js
  .post('/addNavMenus', optionsController.addNavMenus)
  ```

  potionsController

  ```js
  exports.addNavMenus = (req, res) => {
      let obj = req.body;
      obj.icon = 'fa fa-glass';
      console.log(obj)
      optionsModel.addNavMenus(obj, (err) => {
          if (err) {
              res.json({ code: 403, msg: '新增菜单错误' })
          } else {
              res.json({ code: 200, msg: '新增菜单成功' })
          }
      })
  }
  ```

  potionsModel

  ```js
  exports.addNavMenus = (obj, callback) => {
      let sql = 'select value from options where id = 9';
      conn.query(sql, (err, result) => {
          if(err){
              callback(err);
          }else{
              let old = JSON.parse(result[0].value);
              old.push(obj);
              let str = JSON.stringify(old);
              console.log(str)
              sql = 'update options set value=? where id = 9';
              conn.query(sql, str, (err2) => {
                  if(err2){
                      callback(err2);
                  }else{
                      callback(null)
                  }
              })
          }
      })
  }
  ```

- 前台

####   删除

- 后台

  - router

    ```js
    .get('/delNavMenu', optionsController.delNavMenu)
    ```

  - controller

    ```js
    //删除菜单 
    exports.delNavMenu = (req, res) => {
        let obj = req.query.data;
        //设置为存入数组中
        obj = obj instanceof Array ? obj : [obj];
        optionsModel.delNavMenu (obj, (err) => {
            if (err) {
                res.json({ code: 403, msg: '删除菜单错误' })
            } else {
                res.json({ code: 200, msg: '删除菜单成功' })
            }
        })
    }
    ```

    

  - model

    ```js
    //删除菜单(含批量删除)
    exports.delNavMenu = (obj, callback) => {
        let sql = 'select value from options where id = 9';
        conn.query(sql, (err, result) => {
            if(err){
                callback(err)
            }else{
                let arr = JSON.parse(result[0].value);
                let index = [];
                for(let i = 0; i < obj.length; i++){
                    index.push( 
                        arr.findIndex(e => {
                            e = JSON.stringify(e)
                            return e.indexOf(JSON.stringify(obj[i])) !== -1
                        })
                    )
                    //删除对应数组中的项
                    arr.splice(index[i], 1);
                }
                let str = JSON.stringify(arr);
                sql = 'update options set value = ? where id = 9';
                conn.query(sql, str, (err2) => {
                    if(err2){
                        callback(err2)
                    }else{
                        callback(null)
                    }
                })
            }
        })
    }
    ```

- 前台

  单条删除

  ```js
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
  ```

  批量删除

  ```js
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
  ```

  

