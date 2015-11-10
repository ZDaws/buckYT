var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BuckytSchema = new Schema({
	id: String,
    title: String,
    author: String,
    videoList: [String]
});

mongoose.model('Buckyt', BuckytSchema);