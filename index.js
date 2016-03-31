/*
После установки монги под виндой
"C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" --install --dbpath=X:\NodeJS\projects\azbn-express\mongo\db\ --logpath=X:\NodeJS\projects\azbn-express\mongo\log\default.log
*/

var cfg = {
	path : {
		azbnode : './azbnode',
		app : './app/default',
		static : './app/default/static',
	},
	express : {
		port : 8080,
	},
	mongo : {
		host : 'localhost',
		port : 27017,
		db : 'default',
	},
};


var azbn = require(cfg.path.azbnode + '/azbnode');

azbn.load('cfg', cfg);

azbn.load('azbnodeevents', new require(cfg.path.azbnode + '/azbnodeevents')(azbn));
azbn.event('loaded_azbnode', azbn);


azbn.parseArgv();
azbn.event('parsed_argv', azbn);


cfg.path.app = azbn.getArgv('app') || cfg.path.app;
cfg.express.port = azbn.getArgv('port') || cfg.express.port;


//azbn.load('fs', require('fs'));
//azbn.load('querystring', require('querystring'));
//azbn.load('path', require('path'));


var express = require('express');
azbn.load('express', express());

azbn.load('winston', require('./lib/getWinston')(module));


var mongoose = require('mongoose');
mongoose.connect('mongodb://' + cfg.mongo.host + ':' + cfg.mongo.port + '/' + cfg.mongo.db);

azbn.load('mongo', mongoose.connection);

azbn.mdl('mongo').on('error', function (err) {
	azbn.mdl('winston').error('Connection error: ', err.message);
});
azbn.mdl('mongo').once('open', function callback () {
	azbn.mdl('winston').info('Connected to ' + cfg.mongo.host + ':' + cfg.mongo.port + '/' + cfg.mongo.db);
});

azbn.load('db', new require(cfg.path.app + '/mongoose/schema')(azbn, mongoose));

var admin = require('sriracha-admin');
azbn.mdl('express').use('/admin', admin());

//var vhost = require('vhost');
//azbn.mdl('express').use(vhost('localhost', azbn.mdl('express')))

//azbn.mdl('express').use(express.favicon()); // отдаем стандартную фавиконку, можем здесь же свою задать
//azbn.mdl('express').use(express.logger('dev')); // выводим все запросы со статусами в консоль
//azbn.mdl('express').use(express.bodyParser()); // стандартный модуль, для парсинга JSON в запросах
//azbn.mdl('express').use(express.methodOverride()); // поддержка put и delete
//azbn.mdl('express').use(azbn.mdl('express').router); // модуль для простого задания обработчиков путей
//azbn.mdl('express').use(express.static(azbn.mdl('path').join(__dirname, cfg.path.static))); // запуск статического файлового сервера, который смотрит на папку public/ (в нашем случае отдает index.html)


azbn.mdl('express').use((new require(cfg.path.app + '/logger/default')(azbn)));

azbn.mdl('express').use(express.static(cfg.path.static, {
	index : 'index.html',
	redirect : true,
	/*
	setHeaders : function(res, path, stat){
		res.set('x-timestamp' , Date.now());
	}
	*/
}));

//azbn.mdl('express').get('/',				(new require(cfg.path.app + '/route/main/index/get')(azbn)));
/*azbn.mdl('express').get('/',				function(req, res){
	res.sendFile(__dirname + '/' + azbn.mdl('cfg').path.static + '/index.html');
});*/
//azbn.mdl('express').post('/',				(new require(cfg.path.app + '/route/main/index/post')(azbn)));
//azbn.mdl('express').put('/',				(new require(cfg.path.app + '/route/main/index/put')(azbn)));
//azbn.mdl('express').delete('/',				(new require(cfg.path.app + '/route/main/index/delete')(azbn)));

azbn.mdl('express').get('/api/call/',				(new require(cfg.path.app + '/route/api/get')(azbn)));
azbn.mdl('express').post('/api/call/',				(new require(cfg.path.app + '/route/api/post')(azbn)));

azbn.mdl('express').get('/entity/all/',				(new require(cfg.path.app + '/route/entity/all')(azbn)));

azbn.mdl('express').get('/entity/create/',				(new require(cfg.path.app + '/route/entity/create')(azbn)));
azbn.mdl('express').post('/entity/create/',				(new require(cfg.path.app + '/route/entity/create')(azbn)));

azbn.mdl('express').get('/entity/item/:id',				(new require(cfg.path.app + '/route/entity/item')(azbn)));
azbn.mdl('express').put('/entity/item/:id',				(new require(cfg.path.app + '/route/entity/update')(azbn)));
azbn.mdl('express').delete('/entity/item/:id',				(new require(cfg.path.app + '/route/entity/delete')(azbn)));



azbn.mdl('express').use(function(req, res, next){
	res.status(404);
	azbn.mdl('winston').debug('Not found URL: %s', req.url);
	res.send({ error: 'Not found' });
	return;
});

azbn.mdl('express').use(function(err, req, res, next){
	azbn.mdl('winston').error('Internal error(%d): %s', res.statusCode, err.message);
	azbn.mdl('winston').error(err.stack);
	res.status(err.status || 500).send({ error: err.message });
	return;
});

azbn.mdl('express').get('/error', function(req, res, next){
	next(new Error('Error!'));
});



azbn.mdl('express').listen(cfg.express.port, function() {
	azbn.mdl('winston').info('Example app listening on port ' + cfg.express.port + '!');
});