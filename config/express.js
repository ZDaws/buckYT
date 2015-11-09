var express = require('express');
var partials = require('express-partials');
module.exports = function() {
    var app = express();
    app.use(partials());
    app.set('views', './app/views');
    app.set('view engine', 'ejs');
    require('../app/routes/index.server.routes.js')(app);
    app.use(express.static('./public'));
    return app;
};