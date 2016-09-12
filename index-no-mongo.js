'use strict';

var cfg = {
	path : {
		azbnode : './azbnode',
		app : './app/no-mongo',
		static : './app/no-mongo/static',
	},
	cert : {
		key : './cert/private.key',
		cert : './cert/cert.pem',
	},
	express : {
		port : 80,
		sport : 443,
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


azbn.load('fs', require('fs'));
//azbn.load('querystring', require('querystring'));
//azbn.load('path', require('path'));

azbn.load('https', require('https'));


var express = require('express');
azbn.load('express', express());



azbn.mdl('https').createServer({
	key : azbn.mdl('fs').readFileSync(cfg.cert.key),
	cert : azbn.mdl('fs').readFileSync(cfg.cert.cert),
	passphrase : '1985',
}, azbn.mdl('express')).listen(cfg.express.sport);



// модуль логирования
azbn.load('winston', require('./lib/getWinston')(module));


// компрессия
azbn.mdl('express').use(require('compression')());


// логгер
azbn.mdl('express').use((new require(cfg.path.app + '/logger/default')(azbn)));


// боди-парсер
var bodyParser = require('body-parser');
azbn.mdl('express').use(bodyParser.json());
azbn.mdl('express').use(bodyParser.urlencoded({ extended: true }));

// куки-парсер
azbn.mdl('express').use(require('cookie-parser')());


// перепись метода
azbn.mdl('express').use(require('method-override')('_method'));



// сервер статики
azbn.mdl('express').use(express.static(cfg.path.static, {
	index : 'index.html',
	redirect : true,
	
	setHeaders : function(res, path, stat){
		res.set('x-timestamp' , Date.now());
	}
	
}));



require(cfg.path.app + '/app.js')(azbn);



// ошибки
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