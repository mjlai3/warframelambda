exports.myHandler = function(event, context, callback) {
	var http = require('http');
	var options = {
		host: 'warframe.market',
		port: 80,
		path: '/api/get_all_items_v2',
		method: 'GET'
	}

	getJSON(options, function(err, result){
		if(err){
			return console.log('Error while trying to get price: ', err)
		}
		console.log(result);
	});

	function getJSON(options, cb){
		http.request(options, function(res){
			var body = '';

			res.on('data', function(chunk){
				body+= chunk;
			});

			res.on('end', function(){
				var result = JSON.parse(body);
				cb(null, result);
			});

			res.on('error', cb);
		})
		.on('error', cb)
		.end();
	}
	callback(null, 'success');
}

// exports.myHandler();