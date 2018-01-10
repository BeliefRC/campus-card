module.exports = app => {
    app.get('/', (req, res) => {
        res.end(`Hello World`)
    });
};