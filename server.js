var express = require('express');
var engine = require('ejs-locals');
var mongoose = require("mongoose");
var path = require('path');
var googleimages = require( 'google-images' );
var History = require("./models/history");
var bodyparser = require('body-parser');
var app = express();
require('dotenv').load();


mongoose.connect(process.env.MONGO_URI);
mongoose.Promise = global.Promise;

var client =new googleimages(process.env.CSE_ID,process.env.CSE_API_KEY);

var port = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, '/views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

function createResults(image) {
  return {
    url: image.url,
    alt: image.description,
    source: image.parentPage,
  }
}

app.get('/api/search/:query',function(req,res){
	var query=req.params.query,
		offset = req.query.offset || 1,
		date = Date.now();
	client.search(query,{page:offset}).then(images=>{
			res.status(200).json(images.map(createResults));
		});
		var history=new History({
		query:query,
		timestamp:date
	});
	history.save(function(err){
		if(err)
		{
			console.log(err);
		}
		console.log("saving successfull");
	});
});

app.post('/search',function(req,res){
	var search=req.body.search;
	var page=req.body.page || 10;
	var date= Date.now();
	console.log(date);
	client.search( 'Steve Angello',{page:page})
	.then(images=>{
		res.status(200).json(images.map(createResults));
	});
	var history=new History({
		query:search,
		timestamp:date
	});
	history.save(function(err){
		if(err)
		{
			console.log(err);
		}
		console.log("saving successfull");
	})
});
function format(result)
{
	return {
		"term":result.query,
		"when":new Date(result.timestamp)
	};
}
app.get('/api/latest/',function(req,res){
	//console.log("hello");
	History.find()
	       .select({_id:0,query:1,timestamp:1})
	       .sort({timestamp:-1})
	       .limit(10)
	       .then(results=>{
	          results.forEach(function(result){
	          	res.status(200).json(results.map(format));
	          });
	       });
});
app.get('/',function(req,res,next){
	res.render("index");
});
app.get("/latest",function(req,res){
	console.log("Recently stored strings");
});
app.listen(port,function()
{
	console.log("listening at"+port);
});