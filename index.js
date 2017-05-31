exports.myHandler = function(event, context, callback) {
	var request = require('request');
	var _ = require('lodash');

	request('http://warframe.market/api/get_all_items_v2', function(error, response, items){
		items = JSON.parse(items);
		_.forEach(items, function(value, key) {
			request('http://warframe.market/api/get_orders/' + encodeURIComponent(value.item_type) + '/' + encodeURIComponent(value.item_name), function(error, response, order){
				try{
					order = JSON.parse(order);
					request({
						method: "POST",
						uri: 'https://wf-market-aggregator.firebaseio.com/test.json',
						json: order
					});
				}
				catch(e) {
					console.log(e);
				}
			});
		});
	});

	callback(null, 'success');
}

// exports.myHandler();