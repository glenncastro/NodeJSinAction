// NOTE: Comment/Uncomment only the portion you want to run. (e.g, Adding a Task, Searching, Updating or Deleting)
// Opening a connection
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/tasks');

// Registering a schema - Working
var Schema = mongoose.Schema;
var Tasks = new Schema({
	project: String,
	description: String
});
mongoose.model('Task', Tasks);

// Adding a task
var Task = mongoose.model('Task');
var task = new Task();
task.project = 'Bikeshed';
task.description = 'Paint the bikeshed red.';
task.save(function(err) {
	if (err) throw err;
	console.log('Task saved.');
});

/*
// Searching for a document
var Task = mongoose.model('Task');
Task.find({'project': 'Bikeshed'}, function(err, tasks) {
	console.log(tasks);
	
	for (var i=0; i<tasks.length; i++) {
		console.log('ID:' + tasks[i]._id);
		console.log(tasks[i].description);
	}
});
*/

/*
// Updating a Document
var Task = mongoose.model('Task');
Task.update(
	{ _id: '549e2b59a56c20f8b59dcac4' },
	{ description: 'Paint the bikeshed green.'},
	{ multi: false },
	function(err, rows_updated) {
		if (err) throw err;
		console.log('Updated.');
	}
);
*/

/*
// Removing a document
var Task = mongoose.model('Task');
Task.findById('549e2b59a56c20f8b59dcac4', function(err, task) {
	task.remove();
});
*/

// Closing a connection - Do not use for testing.
// mongoose.disconnect();