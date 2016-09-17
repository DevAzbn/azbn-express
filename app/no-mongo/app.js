/*
обработчик запроса
*/

function _(azbn) {
	
	var log_tag = 'app_js';
	//azbn.echo('Handler loaded', log_tag);
	azbn.mdl('winston').info('app.js loaded');
	
	//azbn.mdl('express').get('/api/call/',				(new require(cfg.path.app + '/route/api/get')(azbn)));
	//azbn.mdl('express').post('/api/call/',				(new require(cfg.path.app + '/route/api/post')(azbn)));
	
	azbn.mdl('express').set('views', azbn.mdl('cfg').path.app + '/jade');
	azbn.mdl('express').set('view engine', 'jade');
	
	var NeDB = require('nedb');
	
	azbn.load('nedb.entity', new NeDB({filename : azbn.mdl('cfg').path.app + '/nedb/entity.nedb'}));
	azbn.mdl('nedb.entity').loadDatabase();
	azbn.mdl('nedb.entity').ensureIndex({fieldName : 'uid'});
	
	azbn.mdl('express').post('/process/spawn/',				(new require('./route/process/spawn')(azbn)));
	
	azbn.mdl('express').get('/process/exit/',				(new require('./route/process/exit')(azbn)));
	
	azbn.mdl('express').get('/git/stash/',				(new require('./route/git/stash')(azbn)));
	azbn.mdl('express').get('/git/pull/',				(new require('./route/git/pull')(azbn)));
	
	azbn.mdl('express').get('/npm/i/',				(new require('./route/npm/i')(azbn)));
	
	azbn.mdl('express').get('/api/call/',				(new require('./route/api/get')(azbn)));
	azbn.mdl('express').post('/api/call/',				(new require('./route/api/post')(azbn)));
	
	azbn.mdl('express').get('/entity/item/:uid/',					(new require('./route/entity/item/get')(azbn)));
	azbn.mdl('express').post('/entity/item/create/',				(new require('./route/entity/item/post')(azbn)));
	azbn.mdl('express').put('/entity/item/update/',					(new require('./route/entity/item/put')(azbn)));
	azbn.mdl('express').delete('/entity/item/delete/',				(new require('./route/entity/item/delete')(azbn)));
	
	azbn.mdl('express').get('/entity/list/',						(new require('./route/entity/list/get')(azbn)));
	
	azbn.mdl('express').get('/web/get/',						(new require('./route/web/get')(azbn)));
	
	azbn.mdl('express').get('/jade/index/',						(new require('./route/jade/index')(azbn)));
	
	
	/*
	подключение других модулей?
	*/
	
	azbn.mdl('express').get('/:uid/',					(new require('./route/entity/item/get')(azbn)));
	
	
}

module.exports = _;