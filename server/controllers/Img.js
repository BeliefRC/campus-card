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
//新增(保存)通知
exports.photo = async (req, res) => {
    try {
        let img = req.params[0];
        let imgPath = path.join(__dirname, '../../', `/server/public/upload/${img}`);
        let content = await readFilePromise(imgPath, "binary");
        res.setHeader('Content-Type', 'image/png');
        res.write(content, "binary");
    } catch (e) {
        let imgPath = path.join(__dirname, '../../', '/server/public/upload/404/404.png');
        let content = await readFilePromise(imgPath, "binary");
        res.setHeader('Content-Type', 'image/png');
        res.write(content, "binary");
    }
};

