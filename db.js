var Sequelize = require('sequelize');

var sequelize;

var env = process.env.NODE_ENV || 'development';

if(env === 'production'){
	sequelize = new Sequelize(process.env.DATABASE_URL,{
		dialect:'postgress'
	})
}else{
	sequelize = new Sequelize(undefined,undefined,undefined,{
		dialect:'sqlite',
		storage:__dirname + '/data/appointment-db.sqlite'
	}
	)
};

var appointments = sequelize.import(__dirname + '/models/appointment.js');

module.exports ={
	Sequelize:Sequelize,
	sequelize:sequelize,
	appointments:appointments
}