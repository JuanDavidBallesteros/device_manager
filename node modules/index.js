const http = require('http');

const recuestHandler = require('./requestHandler')

global.resources = {
  devices: [
    {
      zone: 'Living room',
      name: 'Beo play sound',
      deviceType: 'Player',
      id: '#PS-122'
    },
    {
      zone: 'Living room',
      name: 'Beo play sound',
      deviceType: 'Player',
      id: '#PS-122'
    },
    {
      zone: 'Living room',
      name: 'Beo play sound',
      deviceType: 'Player',
      id: '#PS-122'
    }
  ],
}

const server = http.createServer(recuestHandler);

server.listen(5000, () => {
  console.log('server is listening en http://localhost:5000/');
});