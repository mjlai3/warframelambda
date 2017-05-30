exports.myHandler = function(event, context, callback) {
	var _ = require('lodash');
	var http = require('http');

	getOrders('Mod', 'Primed Chamber', function(err, result){
		if(err){
			return console.log('Error while trying to get order details: ', err)
		}
		console.log(result);
	});

	getItemList(function(err, result){
		if(err){
			return console.log('Error while trying to get price: ', err)
		}
		_.forEach(result, function(value, key) {
			console.log(value.item_type);
			console.log(value.item_name);
		})
	});

	function getOrders(item_type, item_name, cb){
		var options = {
			host: 'warframe.market',
			port: 80,
			path: '/api/get_orders/' + encodeURIComponent(item_type) + '/' + encodeURIComponent(item_name),
			method: 'GET'
		}
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

	function getItemList(cb){
		var options = {
			host: 'warframe.market',
			port: 80,
			path: '/api/get_all_items_v2',
			method: 'GET'
		}
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
	// callback(null, 'success');
}

exports.myHandler();