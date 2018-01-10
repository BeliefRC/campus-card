module.exports = function setJson(...arg) {
    return {
        success: arg[0],
        msg: arg[1],
        backData: arg[2]
    }
};
