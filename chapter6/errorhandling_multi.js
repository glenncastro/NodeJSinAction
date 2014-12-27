// Multiple error-handling middleware components
// Listings 6.13 - 6.14

// Implementing the hello middleware component
function hello(req, res, next) {
	if (req.url.match(/^\/hello/)) {
		res.end('Hello World\n');
	} else {
		next();
	}
}

// Listing 6.13 A component that searches for a user in the database
var db = {
	users: [
		{ name: 'tobi' },
		{ name: 'loki' },
		{ name: 'jane' }
	]
};

function users(req, res, next) {
	var match = req.url.match(/^\/user\/(.+)/);
	if (match) {
		var user = db.users[match[1]];
		if (user) {
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(user));
		} else {
			var err = new Error('User not found');
			err.notFound = true;
			next(err);
		}
	} else {
		next();
	}
}

// Implementing the pets middleware component
function pets(req, res, next) {
	if (req.url.match(/^\/pet\/(.+)/)) {
		foo();
	} else {
		next();
	}
}

// Listing 6.14 An error-handling component that doesn't expose unnecessary data
function errorHandler(err, req, res, next) {
	console.error(err.stack);
	res.setHeader('Content-Type', 'application/json');
	if (err.notFound) {
		res.statusCode = 404;
		res.end(JSON.stringify({ error: err.message }));
	} else {
		res.statusCode = 500;
		res.end(JSON.stringify({ error: 'Internal Server Error' }));
	}
}