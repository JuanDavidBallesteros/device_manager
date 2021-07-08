module.exports = function zonesHandler (zones){
    return {
    get: (data, callback) => {
      if(data.indice){
        if(zones[data.indice]){
          return callback(200, zones[data.indice])
        }
        return callback(404, { mensaje: `No found device ${data.indice}` } )
      }
      callback(200, zones);
    },
    put: (data, callback) => {
      if(data.indice){
        if(zones[data.indice]){
          zones[data.indice] = data.payload;
          return callback(200, zones[data.indice])
        }
        return callback(404, { mensaje: `No found device ${data.indice}` } )
      }
      return callback(400, { mensaje: `no index value` } );
    },
    delete: (data, callback) => {
      if(data.indice){
        if(zones[data.indice]){
          temp = zones[data.indice];
          zones = zones.filter((_device, index) => index != data.indice);
          return callback(200, `${temp.name} eliminated`)
        }
        return callback(404, { mensaje: `No found device ${data.indice}` } )
      }
      return callback(400, { mensaje: `no index value` } );
    },
    post: (data, callback) => {
      //zones.push(data.payload);
      zones = [...zones, data.payload];
      callback(201, data.payload);
    }
  }
}