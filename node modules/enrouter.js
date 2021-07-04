
module.exports = {
    ruta: (data, callback) => {
      callback(200, { mensaje: 'esta es ruta' })
    },
    devices: {
      get: (data, callback) => {
        if(data.indice){
          if(global.resources.devices[data.indice]){
            return callback(200, global.resources.devices[data.indice])
          }
          return callback(404, { mensaje: `No found device ${data.indice}` } )
        }
        callback(200, global.resources.devices)
      },
      post: (data, callback) => {
        global.resources.devices.push(data.payload);
        callback(201, data.payload);
      }
    },
    noEncontrado: (data, callback) => {
      callback(404, { mensaje: 'no found' })
    }
  }