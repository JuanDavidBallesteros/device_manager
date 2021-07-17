const http = require('http');
const requestHandler = require('./requestHandler');
const server = http.createServer(requestHandler);

server.listen(5000, () => {
  console.log(
    'server is listening en http://localhost:5000/'
  );
});