/*
запросы http(s) AzbNode
*/

var request = require('request').defaults({
		headers: {
			
			'User-Agent' : 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.115 Safari/537.36 AzbNodeEdition',
			
			//'proxy' : 'http://localproxy.com',
			//'rejectUnauthorized' : false,
		},
	}),
	cheerio = require('cheerio')
	;

function AzbNodeWebClient(azbn) {
	this.name = 'AzbNodeWebClient';
	var log_name = this.name;
	
	//azbn.echo('Created', this.name);
	/*
	data = {
		formData : formData,
		headers: {
			'User-Agent': 'request'
		},
	}
	*/
	
	this.get = function(url, data, cb){
		data.url = url;
		request.get(data, cb);
	};
	this.head = function(url, data, cb){
		data.url = url;
		request.head(data, cb);
	};
	this.post = function(url, data, cb){
		data.url = url;
		request.post(data, cb);
	};
	this.put = function(url, data, cb){
		data.url = url;
		request.put(data, cb);
	};
	this.delete = function(url, data, cb){
		data.url = url;
		request.delete(data, cb);
	};
	this.parse = function(html) {
		return cheerio.load(html, {
			normalizeWhitespace : true,
			//xmlMode : true,
		});
	};
	this.selfAPI = function(url, data, cb){
		data.url = 'https://localhost:' + azbn.mdl('cfg').express.sport + url;
		request.post(data, cb);
	};
	
	return this;
}

module.exports = AzbNodeWebClient;