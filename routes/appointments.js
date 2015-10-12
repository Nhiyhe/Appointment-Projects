var appointments = require('../db/appointments').appointments;
var id = require('../db/appointments').id;
var _ = require('underscore');

var index = function(req,res){
	res.send('Welcome to Appointment Service');
};

var list = function(req,res){
	res.json(appointments);
}

var getById = function(req,res){
	var matchedAppointment;
	var appointmentId = parseInt(req.params.id,10);
	matchedAppointment = _.findWhere(appointments, {id:appointmentId});
	
	if(!matchedAppointment){
		res.status(404).json({"Error":"Appointment Not Found!"});
	}
	return res.json(matchedAppointment);
};

var create = function(req,res){
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
};

var remove = function(req,res){
	var appointmentId = parseInt(req.params.id,10);
	var matchedAppointment = _.findWhere(appointments,{id:appointmentId});
		
	if(!matchedAppointment){
		return res.status(404).send();
	}	
	appointments = _.without(appointments,matchedAppointment);
	res.json(matchedAppointment);
};

var update =  function(req,res){
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
	
};

module.exports = {
	index:index,
	list:list,
	getById:getById,
	create:create,
	remove:remove,
	update:update
}