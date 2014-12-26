// Connecting to a Redis server
var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1');

client.on('error', function(err) {
	console.log('Error ' + err);
});

// Manipulating data in Redis
client.set('color', 'red', redis.print);
client.get('color', function(err, value) {
	if (err) throw err;
	console.log('Got: ' + value);
});

// Storing and retrieving values using a Hash Table
client.hmset('camping', {
	'shelter': '2-person tent',
	'cooking': 'campstove'
}, redis.print);

client.hget('camping', 'cooking', function(err, value) {
	if (err) throw err;
	console.log('Will be cooking with: ' + value);
});

client.hkeys('camping', function(err, keys) {
	if (err) throw err;
	keys.forEach(function(key, i) {
		console.log('	' + key);
	});
});

// Storing and retrieving data using the List
client.lpush('tasks', 'Paint the bikeshed red.', redis.print);
client.lpush('tasks', 'Paint the bikeshed green.', redis.print);
client.lrange('tasks', 0, -1, function(err, items) {
	if (err) throw err;
	items.forEach(function(item, i) {
		console.log('	' + item);
	});
});

// Storing and retrieving data using Sets
client.sadd('ip_addresses', '204.10.37.96', redis.print);
client.sadd('ip_addresses', '204.10.37.96', redis.print);
client.sadd('ip_addresses', '72.32.231.8', redis.print);
client.smembers('ip_addresses', function(err, members) {
	if (err) throw err;
	console.log(members);
});