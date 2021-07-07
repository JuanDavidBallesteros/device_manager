const resources = require('./resources');
const devices = require('./routes/devices');

module.exports = {
    ruta: (_data, callback) => {
      return callback(200, { mensaje: 'esta es ruta' })
    },
    devices: devices(resources.devices),
    noEncontrado: (_data, callback) => {
      callback(404, { mensaje: 'no found page' })
    }
  }