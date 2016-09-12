/*
обработчик запроса
*/

function _(azbn) {
	
	var log_tag = 'app_js';
	azbn.echo('Handler loaded', log_tag);
	
	//azbn.mdl('express').get('/api/call/',				(new require(cfg.path.app + '/route/api/get')(azbn)));
	//azbn.mdl('express').post('/api/call/',				(new require(cfg.path.app + '/route/api/post')(azbn)));
	
	var NeDB = require('nedb');
	
	azbn.load('nedb.entity', new NeDB({filename : azbn.mdl('cfg').path.app + '/nedb/entity.nedb'}));
	azbn.mdl('nedb.entity').loadDatabase();
	azbn.mdl('nedb.entity').ensureIndex({fieldName : 'uid'});
	
	//azbn.mdl('express').get('/api/call/',				(new require('./route/api/get')(azbn)));
	//azbn.mdl('express').post('/api/call/',				(new require('./route/api/post')(azbn)));
	
	azbn.mdl('express').get('/:uid/',					(new require('./route/entity/item/get')(azbn)));
	
	azbn.mdl('express').get('/entity/item/:uid/',					(new require('./route/entity/item/get')(azbn)));
	azbn.mdl('express').post('/entity/item/create/',				(new require('./route/entity/item/post')(azbn)));
	azbn.mdl('express').put('/entity/item/update/',					(new require('./route/entity/item/put')(azbn)));
	azbn.mdl('express').delete('/entity/item/delete/',				(new require('./route/entity/item/delete')(azbn)));
	
	azbn.mdl('express').get('/entity/list/',						(new require('./route/entity/list/get')(azbn)));
	
}

module.exports = _;