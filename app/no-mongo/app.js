/*
обработчик запроса
*/

function _(azbn) {
	
	var log_tag = 'app_js';
	azbn.echo('Handler loaded', log_tag);
	
	//azbn.mdl('express').get('/',				(new require(cfg.path.app + '/route/main/index/get')(azbn)));
	/*azbn.mdl('express').get('/',				function(req, res){
		res.sendFile(__dirname + '/' + azbn.mdl('cfg').path.static + '/index.html');
	});*/
	//azbn.mdl('express').post('/',				(new require(cfg.path.app + '/route/main/index/post')(azbn)));
	//azbn.mdl('express').put('/',				(new require(cfg.path.app + '/route/main/index/put')(azbn)));
	//azbn.mdl('express').delete('/',				(new require(cfg.path.app + '/route/main/index/delete')(azbn)));
	
	//azbn.mdl('express').get('/api/call/',				(new require(cfg.path.app + '/route/api/get')(azbn)));
	//azbn.mdl('express').post('/api/call/',				(new require(cfg.path.app + '/route/api/post')(azbn)));
	
	var NeDB = require('nedb');
	
	azbn.load('nedb.entity', new NeDB({filename : 'nedb/entity.nedb'}));
	azbn.mdl('nedb.entity').loadDatabase();
	
	//azbn.mdl('express').get('/api/call/',				(new require('./route/api/get')(azbn)));
	//azbn.mdl('express').post('/api/call/',				(new require('./route/api/post')(azbn)));
	
	azbn.mdl('express').get('/entity/item/:id',				(new require('./route/entity/item')(azbn)));
	
}

module.exports = _;