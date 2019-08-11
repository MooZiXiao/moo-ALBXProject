const formidable = require('formidable');
const path = require('path');
exports.uploadFile = (req, res) => {
    let form = formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = __dirname + '/../uploads';
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