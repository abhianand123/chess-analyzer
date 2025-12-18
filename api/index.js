const app = require('../dist/index.js');

module.exports = (req, res) => {
    const handler = app.default || app;
    handler(req, res);
};
