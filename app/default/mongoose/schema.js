/*
Схема данных Монго
*/

function _(azbn, mongoose) {
	
	var log_tag = 'api/get';
	azbn.echo('Schema loaded', log_tag);
	
	var Schema = mongoose.Schema;
	
	var Entity = new Schema({
		id : {
			type : Number,
			required: true,
		},
		created_at : {
			type : Date,
			default : Date.now,
		},
		title : {
			type: String,
			required: true,
		},
	});
	
	Entity.path('id').validate(function (v) {
		return parseInt(v) > 0;
	});
	Entity.path('title').validate(function (v) {
		return v.length > 0 && v.length < 1024;
	});
	
	this.Entity = mongoose.model('Entity', Entity);
	
	return this;
}

module.exports = _;