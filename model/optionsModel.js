const conn = require('../utils/sqlHelper');
//获得菜单
exports.getNavMenus = (callback) => {
    let sql = 'select value from options where id = 9';
    conn.query(sql, (err, result) => {
        let data = JSON.parse(result[0].value);
        callback(null, data);
    })
}
//新增菜单
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
//删除菜单
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
//轮播显示
exports.getSlides = (callback) => {
    let sql = 'select value from options where id = 10';
    conn.query(sql, (err, result) => {
        if(err){
            callback(err)
        }else{
            let data = JSON.parse(result[0].value);
            callback(null, data);
        }
    })
}
//轮播添加
exports.addSlides = (obj, callback) => {
    let sql = 'select value from options where id = 10';
    conn.query(sql, (err, result) => {
        if(err){
            callback(err)
        }else{
            let arr = JSON.parse(result[0].value);
            arr.push(obj);
            let str = JSON.stringify(arr);
            sql = 'update options set value = ? where id = 10';
            conn.query(sql, str, (err2, res2) => {
                if(err2){
                    callback(err2);
                }else{
                    callback(null)
                }
            })
        }
    })
}
//删除轮播
exports.delSlides = (obj, callback) => {
    let sql = 'select value from options where id = 10';
    conn.query(sql, (err, result) => {
        if(err){
            callback(err)
        }else{
            let arr = JSON.parse(result[0].value);
            let index = [];
            for(let i = 0; i < obj.length; i++){
                index.push(arr.findIndex(e => {
                    return JSON.stringify(e) == JSON.stringify(obj[i])
                }))
                arr.splice(index[i], 1);
            }
            let str = JSON.stringify(arr);
            sql = 'update options set value = ? where id = 10';
            conn.query(sql, str, (err2, res2) => {
                if(err2){
                    callback(err2);
                }else{
                    callback(null)
                }
            })
        }
    })
}
// exports.delSlides = (obj, callback) => {
//     let sql = 'select value from options where id = 10';
//     conn.query(sql, (err, result) => {
//         if(err){
//             callback(err)
//         }else{
//             let arr = JSON.parse(result[0].value);
//             console.log(arr)
//             let index = arr.findIndex(e => {
//                 return e == obj
//             })
//             arr.splice(index, 1);
//             console.log(arr)
//             let str = JSON.stringify(arr);
//             sql = 'update options set value = ? where id = 10';
//             conn.query(sql, str, (err2, res2) => {
//                 if(err2){
//                     callback(err2);
//                 }else{
//                     callback(null)
//                 }
//             })
//         }
//     })
// }
//网站设置的显示
exports.getAllOptions = (callback) => {
    let sql = 'select value from options where id < 9';
    conn.query(sql, (err, result) => {
        if(err){
            callback(err);
        }else{
            callback(null, result);
        }
    })
}
//网站设置的修改
exports.updateOptions = (obj, callback) => {
    let cnt = 0;
    for( key in obj){
        let sql = 'update `options` set value = ? where `key` = ?';
        conn.query(sql, [obj[key], key], (err, result) => {
            if(err){
                callback(err);
            }else{
                cnt++;
                if(cnt == 6){
                    callback(null);
                }
            }
        })
    }
}