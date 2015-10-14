var appointments = require('../db/appointments').appointments;
var id = require('../db/appointments').id;
var _ = require('underscore');
var db = require('../db');

var index = function(req,res){
	res.send('Welcome to Appointment Service');
};

var list = function(req,res){
	db.appointments.findAll().then(function(appointments){
		res.json(appointments);
	},function(error){
		res.status(400).send();
	})
};

var getById = function(req,res){
	var appointmentId = parseInt(req.params.id,10);
	db.appointments.findById(appointmentId).then(function(appointment){
		res.json(appointment.toJSON());
	},function(error){
		res.status(404).send();
	})
	
	
};

var create = function(req,res){
	var body = req.body;
	body = _.pick(body,'name','title','lastName','dob','gp','completed')
	
	db.appointments.create(body).then(function(newAppointment){
		res.json(newAppointment.toJSON());
	},function(error){
		res.status(500).json(error);
	})
	
	
};

var remove = function(req,res){
	var appointmentId = parseInt(req.params.id,10);
	db.appointments.destroy({where:{id:appointmentId}}).then(function(rows){
		if(rows === 0){
			res.status(404).send()
		}else{
			res.status(204).send();
		}
	},function(error){
		res.status(500).send();
	})
};

var update =  function(req,res){
	var itemId = parseInt(req.params.id,10);
	var body = req.body;
	var attributes = {};
	
	if(body.hasOwnProperty('name') ){
		attributes.name = body.name.trim();
	}
	
	if(body.hasOwnProperty('title')){
		attributes.title = body.title.trim();
	}		
	
	if(body.hasOwnProperty('gp')){
		attributes.gp = body.gp.trim();
	}
		
	if(body.hasOwnProperty('completed')){
		attributes.completed = body.completed;
	}
			
	if(body.hasOwnProperty('dob')){
		attributes.dob = body.dob.trim();
	}
	
	db.appointments.findById(itemId).then(function(appointment){
		appointment.update(attributes).then(function(apptment){
			res.json(apptment.toJSON());
		},function(error){
			res.status(500).send();
		});
		
	},function(error){
		res.status(404).send();
	})
};

module.exports = {
	index:index,
	list:list,
	getById:getById,
	create:create,
	remove:remove,
	update:update
}