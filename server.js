var express = require('express');
var _ = require('underscore');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
var port = process.env.PORT || 3010;

var appointments =[
	{
		id:1,
		title:"General Check Up",
		name:'John',
		lastName:'Kurata',
		DateOfBirth:"02/03/1990",
		completed:true,
		gp:"Dr Julie"
	},
	{
		id:2,
		title:"General Check Up",
		name:'Peter',
		lastName:'Hammond',
		DateOfBirth:"02/03/1994",
		completed:true,
		gp:"Dr Andrew"
	},
	{
		id:3,
		title:"General Check Up",
		name:'Jane',
		lastName:'Doe',
		DateOfBirth:"02/03/1990",
		completed:true,
		gp:"Dr Brown"
	}
]

var id =4;
app.get('/',function(req,res){
	res.send('Welcome to Appointment Service');
});

app.get('/appointments',function(req,res){
	res.json(appointments);	
});

app.get('/appointments/:id',function(req,res){
	var matchedAppointment;
	var appointmentId = parseInt(req.params.id,10);
	matchedAppointment = _.findWhere(appointments, {id:appointmentId});
	
	if(!matchedAppointment){
		res.status(404).json({"Error":"Appointment Not Found!"});
	}
	return res.json(matchedAppointment);
});

app.post('/appointments',function(req,res){
	var body = req.body;
	body = _.pick(body,'name','title','gp','completed')
	
	if(!body.hasOwnProperty('name') || ! _.isString(body.name) || body.name.trim().length == 0 ){
		return res.status(400).send();
	};
	if(!body.hasOwnProperty('title') || ! _.isString(body.title) || body.title.trim().length == 0 ){
		return res.status(400).send();
	};
	if(!body.hasOwnProperty('gp') || ! _.isString(body.gp) || body.gp.trim().length == 0 ){
		return res.status(400).send();
	};
	if(!body.hasOwnProperty('completed') || ! _.isBoolean(body.completed)  ){
		return res.status(400).send();
	}
	body.id = id++;
	body.name = body.name.trim();
	appointments.push(body);
	res.json(body);
});


app.delete('/appointments/:id',function(req,res){
	var appointmentId = parseInt(req.params.id,10);
	var matchedAppointment = _.findWhere(appointments,{id:appointmentId});
		
	if(!matchedAppointment){
		return res.status(404).send();
	}	
	appointments = _.without(appointments,matchedAppointment);
	res.json(matchedAppointment);
});

app.put('/appointments/:id', function(req,res){
	var itemId = parseInt(req.params.id,10);
	var item =_.findWhere(appointments,{id:itemId});
	 var modifiedAttributes = {};
	var body = req.body;
	if(!body.hasOwnProperty('name') || ! _.isString(body.name) || body.name.trim().length == 0 ){
		return res.status(400).send();
	}else{
		modifiedAttributes.name = body.name.trim();
	}
	if(!body.hasOwnProperty('title') || ! _.isString(body.title) || body.title.trim().length == 0 ){
		return res.status(400).send();
	}
		modifiedAttributes.title = body.title.trim();
	
	if(!body.hasOwnProperty('gp') || ! _.isString(body.gp) || body.gp.trim().length == 0 ){
		return res.status(400).send();
	}
		modifiedAttributes.gp = body.gp.trim();
	
	if(!body.hasOwnProperty('completed') || ! _.isBoolean(body.completed)  ){
		return res.status(400).send();
	}
	modifiedAttributes.completed = body.completed;
	
	_.extend(item,modifiedAttributes);
	res.json(item);
	
});

app.listen(port, function(){
	console.log("Server is running on port " + port);
});