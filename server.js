var express = require('express');
var engine = require('ejs-locals');
var mongoose = require("mongoose");
var path = require('path');
var googleimages = require( 'google-images' );
var bodyparser = require('body-parser');
var app = express();
require('dotenv').load();
var client =new googleimages(process.env.CSE_ID,process.env.CSE_API_KEY);

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
app.post('/search',function(req,res){
	var search=req.body.search;
	var page=req.body.page || 10;
	client.search( 'Steve Angello',{page:page})
	.then(images=>{
		res.status(200).json(images.map(createResults));
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
})