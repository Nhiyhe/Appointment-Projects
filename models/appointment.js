module.exports = function(sequelize,dataTypes){
	return sequelize.define('appointments',{
		title:{
			type:dataTypes.STRING
		},
		name:{
			type:dataTypes.STRING
		},
		lastName:{
			type:dataTypes.STRING
		},
		dob:{
			type:dataTypes.DATE
		},
		completed:{
			type:dataTypes.BOOLEAN,
			defaultValue:false
		},gp:{
			type:dataTypes.STRING
		}
	})
};