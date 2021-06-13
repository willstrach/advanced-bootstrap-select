const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/advanced-bootstrap-select.js',
    output: {
        filename: 'advanced-bootstrap-select.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
};