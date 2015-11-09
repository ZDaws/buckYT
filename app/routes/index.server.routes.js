module.exports = function(app) {
    var index = require('../controllers/index.server.controller');
    app.get('/', index.render);
    var make = require('../controllers/make.server.controller');
    app.get('/make/', make.render);
    var share = require('../controllers/share.server.controller');
    app.get('/share/', share.render);
    var view = require('../controllers/view.server.controller');
    app.get('/view/', view.render);
};