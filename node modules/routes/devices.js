module.exports = function devicesHandler (devices){
    return {
    get: (data, callback) => {
      if(data.indice){
        if(devices[data.indice]){
          return callback(200, devices[data.indice])
        }
        return callback(404, { mensaje: `No found device ${data.indice}` } )
      }
      callback(200, devices);
    },
    put: (data, callback) => {
      if(data.indice){
        if(devices[data.indice]){
          devices[data.indice] = data.payload;
          return callback(200, devices[data.indice])
        }
        return callback(404, { mensaje: `No found device ${data.indice}` } )
      }
      return callback(400, { mensaje: `no index value` } );
    },
    delete: (data, callback) => {
      if(data.indice){
        if(devices[data.indice]){
          temp = devices[data.indice];
          devices = devices.filter((_device, index) => index != data.indice);
          return callback(200, `${temp.name} eliminated`)
        }
        return callback(404, { mensaje: `No found device ${data.indice}` } )
      }
      return callback(400, { mensaje: `no index value` } );
    },
    post: (data, callback) => {
      devices.push(data.payload);
      callback(201, data.payload);
    }
  }
}