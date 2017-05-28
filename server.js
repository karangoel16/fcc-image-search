var express = require('express');
var engine = require('ejs-locals');
var mongoose = require("mongoose");
var path = require('path');
var app = express();
require('dotenv').load();

var port = process.env.PORT || 3000;


app.set('views', path.join(__dirname, '/views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

app.get('/',function(req,res,next){
	res.send("Hello");
});

app.listen(port,function()
{
	console.log("listening at"+port);
})