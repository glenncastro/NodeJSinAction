// Mounting a middleware component or server
var connect = require('connect');

connect()
	.use(logger)
	.use('/admin', restrict)
	.use('/admin', admin)
	.use(hello)
	.listen(3000);

// Basic authentication
function restrict(req, res, next) {
	var authorization = req.headers.authorization;
	if (! authorization) return next(new Error('Unauthorized'));

	var parts = authorization.split(' ');
	var scheme = parts[0];
	var auth = new Buffer(parts[1], 'base64').toString().split(':');
	var user = auth[0];
	var pass = auth[1];

	authenticateWithDatabase(user, pass, function(err) {
		if (err) return next(err);
		next();
	});
}

// Routing admin requests
function admin(req, res, next) {
	switch (req.url) {
		case '/':
			res.end('try /users');
			break;
		case '/users':
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(['tobi', 'loki', 'jane']));
			break;
	}
}

function logger(req, res, next) {
	console.log('%s %s', req.method, req.url);
	next();
}

function hello(req, res) {
	res.setHeader('Content-Type', 'text/plain');
	res.end('hello world');
}

// dummy implementation
function authenticateWithDatabase(user, pass, cb) {
	if (user !== 'Glenn' && pass !== 'Castro') {
		return cb(new Error('Invalid username / password'));
	}
	console.log('authenticateWithDatabase');
	console.log('user: %s', user);
	console.log('password: %s', pass);
	cb();
}