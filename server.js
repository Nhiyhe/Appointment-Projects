var express = require('express');
var _ = require('underscore');
var bodyParser = require('body-parser');
var appointments = require('./db/appointments').appointments;
var id = require('./db/appointments').id;

var appoint = require('./routes/appointments');
var app = express();

app.use(bodyParser.json());
var port = process.env.PORT || 3010;


app.get('/',function(req,res){
	res.send('Welcome to Appointment Service');
});

app.get('/',appoint.index);

app.get('/appointments',appoint.list);

app.get('/appointments/:id',appoint.getById);

app.post('/appointments',appoint.create);

app.delete('/appointments/:id',appoint.remove);

app.put('/appointments/:id',appoint.update);

app.listen(port, function(){
	console.log("Server is running on port " + port);
});