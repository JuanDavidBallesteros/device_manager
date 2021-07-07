const resources = require('./resources');
const devices = require('./routes/devices');
const zones = require('./routes/zones');
const administrators = require('./routes/administrators');

module.exports = {
    ruta: (_data, callback) => {
      return callback(200, { mensaje: 'esta es ruta' })
    },
    devices: devices(resources.devices),
    zones: zones(resources.zones),
    administrators: administrators(resources.administrators),
    noEncontrado: (_data, callback) => {
      callback(404, { mensaje: 'no found page' })
    }
  }