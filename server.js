var express = require('express');

var app = express();

var port = process.env.PORT || 3010;

app.get('/',function(req,res){
	res.send('Welcome to Express');
})

app.listen(port, function(){
	console.log("Server is running on port " + port);
});