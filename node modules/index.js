const http = require('http');

const requestHandler = require('./requestHandler');
const resources = require('./resources');

global.resources = resources;

const server = http.createServer(requestHandler);

server.listen(5000, () => {
  console.log('server is listening en http://localhost:5000/');
});