var express = require('express');
var engine = require('ejs-locals');
var app = express();
useragent(true);
var port = process.env.PORT || 3000;
app.get('/',function(req,res,next){
	
});
app.listen(port,function()
{
	console.log("listening at"+port);
})