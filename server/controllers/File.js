const fs = require('fs');
const path = require('path');
const setJson = require('../until/SetJson');
const File = require('../models/File');


const readFilePromise = (path) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
};


const writeFilePromise = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
};
const unlinkPromise = (path) => {
    return new Promise((resolve, reject) => {
        fs.unlink(path, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
};


exports.upload = async (req, res, next) => {
    try {
        let fileData = req.files.file;
        let filePath = fileData ? fileData.path : '';
        let originalFilename = fileData ? fileData.originalFilename : '';
        //存在上传的文件则保存到服务器
        if (originalFilename) {
            let data = await readFilePromise(filePath);
            let timestamp = Date.now();
            let type = originalFilename.split('.')[originalFilename.split('.').length - 1];
            let file = `${timestamp}.${type}`;
            let newPath = path.join(__dirname, '../../', '/server/public/upload/files/' + file);
            await  writeFilePromise(newPath, data);
            let newFile = new File({filename: file, originalName: originalFilename});
            await newFile.save();
            res.json(setJson(true, '上传文件成功', null))

        }
    }
    catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null));
    }
};

//文件列表
exports.fileFist = async (req, res) => {
    try {
        let files = await File.find({})
            .sort({'meta.updateAt': -1});
        res.json(setJson(true, '查询列表情成功', files))
    } catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null))
    }
};

//删除文件
exports.delete = async (req, res) => {
    try {
        let _id = req.body._id;
        let file = await File.findOneAndRemove({_id});
        //删除文件资源
        if (file && file.filename) {
            let oldPath = path.join(__dirname, '../../', `/server/public/upload/files/${file.filename}`);
            await unlinkPromise(oldPath)
        }
        res.json(setJson(true, '删除文件成功', file))
    }
    catch (e) {
        console.log(e.stack);
        res.json(setJson(false, e.message, null))
    }
};

//显示图片
exports.photo = async (req, res) => {
    try {


    } catch (e) {

    }
};

