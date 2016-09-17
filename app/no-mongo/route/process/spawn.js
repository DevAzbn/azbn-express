/*
обработчик запроса
*/

function _(azbn) {
	
	var log_tag = 'process/spawn';
	azbn.echo('Handler loaded', log_tag);
	
	this.handler = function(req, res) {
		
		var resp = {
			stdout : [],
			stderr : [],
			code : null,
		};
		
		var command = req.body.command;
		var command_arr = command.split(' ');
		var command_root = command_arr.shift();
		
		var spawn = require('child_process').spawn;
		var command_process = spawn(command_root, command_arr);
		
		command_process.stdout.on('data', function(data){
			resp.stdout.push(data.toString('utf8'));
		});
		
		command_process.stderr.on('data', function(data){
			resp.stderr.push(data.toString('utf8'));
		});
		
		command_process.on('close', function(code){
			//console.log(`child process exited with code ${code}`);
			resp.code = code;
			
			res.send(resp);
		});
		
	}
	
	return this.handler;
}

module.exports = _;