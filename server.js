var express = require('express');
var engine = require('ejs-locals');
var app = express();
var port = process.env.PORT || 3000;
app.get('/',function(req,res,next){
	res.send("Hello");
});
app.listen(port,function()
{
	console.log("listening at"+port);
})