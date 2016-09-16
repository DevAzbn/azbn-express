/*
обработчик запроса
*/

function _(azbn) {
	
	var log_tag = 'npm/i';
	azbn.echo('Handler loaded', log_tag);
	
	this.handler = function(req, res) {
		
		var resp = 'npm i response:';
		
		var child_process = require('child_process');
		var cmd = child_process.spawn('npm', ['i']);
		
		cmd.stdout.on('data', function(data){
			//console.log(`stdout: ${data}`);
			resp = resp + '\n' + data;
		});
		
		cmd.stderr.on('data', function(data){
			//console.log(`stderr: ${data}`);
			resp = resp + '\n' + data;
		});
		
		cmd.on('close', function(code){
			//console.log(`child process exited with code ${code}`);
			resp = resp + '\n' + 'Child process exited with code' + code;
			
			res.send(resp);
		});
		
	}
	
	return this.handler;
}

module.exports = _;