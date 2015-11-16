var Buckyt = require('mongoose').model('Buckyt');

exports.render = function(req, res) {
	Buckyt.findOne({'id' : req.params.buckytId}, function(err, buckyt){
		res.render('view', {
        	title: buckyt.title,
        	activePage: 'View',
        	buckyt: buckyt
    	})
	});
};
