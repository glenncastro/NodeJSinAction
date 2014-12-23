To test todo.js, type the following in the terminal:

POST:
$ curl -d 'buy groceries' http://localhost:3000
$ curl -d 'buy node in action' http://localhost:3000

GET:
$ curl http://localhost:3000

DELETE:
$ curl -X DELETE http://localhost:3000/0
