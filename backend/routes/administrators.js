module.exports = function administratorsHandler (administrators){
    return {
    get: (data, callback) => {
      if(data.indice){
        if(administrators[data.indice]){
          return callback(200, administrators[data.indice])
        }
        return callback(404, { mensaje: `No found device ${data.indice}` } )
      }
      callback(200, administrators);
    },
    put: (data, callback) => {
      if(data.indice){
        if(administrators[data.indice]){
          administrators[data.indice] = data.payload;
          return callback(200, administrators[data.indice])
        }
        return callback(404, { mensaje: `No found device ${data.indice}` } )
      }
      return callback(400, { mensaje: `no index value` } );
    },
    delete: (data, callback) => {
      if(data.indice){
        if(administrators[data.indice]){
          temp = administrators[data.indice];
          administrators = administrators.filter((_administrator, index) => index != data.indice);
          return callback(200, `${temp.name} eliminated`)
        }
        return callback(404, { mensaje: `No found administrator ${data.indice}` } )
      }
      return callback(400, { mensaje: `no index value` } );
    },
    post: (data, callback) => {
      //administrators.push(data.payload);
      administrators = [...administrators, data.payload];
      callback(201, data.payload);
    }
  }
}