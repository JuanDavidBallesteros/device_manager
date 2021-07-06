
module.exports = {
    ruta: (data, callback) => {
      return callback(200, { mensaje: 'esta es ruta' })
    },
    devices: {
      get: (data, callback) => {
        if(data.indice){
          if(global.resources.devices[data.indice]){
            return callback(200, global.resources.devices[data.indice])
          }
          return callback(404, { mensaje: `No found device ${data.indice}` } )
        }
        callback(200, global.resources.devices);
      },
      put: (data, callback) => {
        if(data.indice){
          if(global.resources.devices[data.indice]){
            global.resources.devices[data.indice] = data.payload;
            return callback(200, global.resources.devices[data.indice])
          }
          return callback(404, { mensaje: `No found device ${data.indice}` } )
        }
        return callback(400, { mensaje: `no index value` } );
      },
      post: (data, callback) => {
        global.resources.devices.push(data.payload);
        callback(201, data.payload);
      }
    },
    noEncontrado: (data, callback) => {
      callback(404, { mensaje: 'no found page' })
    }
  }