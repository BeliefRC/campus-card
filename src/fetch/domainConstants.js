export let DOMAIN = '';
if (process.env === 'production') {
    DOMAIN = 'campusCard.rc22.cc'
} else {
    DOMAIN = 'http://127.0.0.1:3001'
}
