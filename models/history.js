var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var history =new Schema({
	timestamp:Number,
	query:String
});
history.index({timestamp:1});
module.exports= mongoose.model('History',history);