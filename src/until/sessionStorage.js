export default {
    getItem: function (key) {
        let value;
        try {
            value = sessionStorage.getItem(key)
        } catch (ex) {
            // 开发环境下提示error
            if (process.env.NODE_ENV === 'development') {
                console.error('sessionStorage.getItem报错, ', ex.message)
            }
        } finally {
            return value
        }
    },
    setItem(key, value) {
        try {
            // ios safari 无痕模式下，直接使用 sessionStorage.setItem 会报错
            sessionStorage.setItem(key, value)
        } catch (ex) {
            // 开发环境下提示 error
            if (process.env.NODE_ENV === 'development') {
                console.error('sessionStorage.setItem报错, ', ex.message)
            }
        }
    }
}