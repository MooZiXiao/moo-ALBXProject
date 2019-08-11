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