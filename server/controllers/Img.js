const fs = require('fs');
const path = require('path');


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
//显示图片
exports.photo = async (req, res) => {
    try {
        let img = req.params[0];
        let imgPath = path.join(__dirname, '../../', `/server/public/upload/imgs/${img}`);
        let content = await readFilePromise(imgPath, "binary");
        res.setHeader('Content-Type', 'image/png');
        res.end(new Buffer(content, 'binary'));

    } catch (e) {
        let imgPath = path.join(__dirname, '../../', '/server/public/upload/imgs/404/404.png');
        let content = await readFilePromise(imgPath, "binary");
        res.setHeader('Content-Type', 'image/png');
        res.end(new Buffer(content, 'binary'));
    }
};

