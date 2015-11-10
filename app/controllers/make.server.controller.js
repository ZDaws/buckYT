var Buckyt = require('mongoose').model('Buckyt');

exports.render = function(req, res) {
    res.render('make', {
        title: 'Make',
        activePage: 'Make'
    })
};
function makeid(){
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
exports.create = function(req, res) {
	var buckytId = makeid();
	var buckyt = new Buckyt({
		id: buckytId,
		title: req.body.title,
		author: req.body.author,
		videoList: req.body.videoList.split(',')
	});
    buckyt.save(function(err) {
        if (err) {
            return next(err);
        }
        else {
            res.redirect('/view/' + buckytId);
        }
    });
};