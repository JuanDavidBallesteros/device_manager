const url = require('url');
const stringDecoder = require('string_decoder').StringDecoder;
const enrutador = require('./enrouter');

module.exports = (req, res) => {
    // Obtener url from objeto request - req
    const urlA = req.url;
    const urlParse = url.parse(urlA, true);
  
    //1.0 Obtener la ruta
    const ruta = urlParse.pathname;
  
    //2.0 Limpiar text ruta
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g, ''); // quita todos los /
  
    //3.1 Obtener metodo Http
    const metodo = req.method.toLocaleLowerCase();
  
    //3.2 Obtener variiables el query url
    const { query = {} } = urlParse; // Destructuración, en caso de que este vacío un objeto vacío (query={})
    //console.log({ query });
  
    //3.3 Obetener los headers
    const { headers = {} } = req;
    //console.log({headers});
  
    //3.4 Obtener payload, si lo hay
    const decoder = new stringDecoder('utf-8');
    let buffer = '';
  
    req.on('data', (data) => { // inicia el decoder
      buffer += decoder.write(data);
    });
    req.on('end', () => { // cierra el decoder
      buffer += decoder.end();
  
      if (headers['content-type'] === 'application/json') {
        buffer = JSON.parse(buffer);
      }
  
      if (rutaLimpia.includes("/")) {  // Revisa si sub-rutas (indice de arreglo)
        //Split
        //console.log('ENTRA');
        var [rutaPrincipal, indice] = rutaLimpia.split("/");
      } else {
        //console.log('SALTA', rutaLimpia);
        rutaPrincipal = rutaLimpia;
      }
  
      //3.5 ordenar la data, para pasarla por el enrutador (handler)
      const data = { // Los datos de un request de forma legible
        indice: indice,
        ruta: rutaPrincipal,
        query,
        metodo,
        headers,
        payload: buffer
      };
  
      //console.log({ data });
      // elegir el manejador dependiendo de la ruta
  
      let handler;
      if (rutaPrincipal && enrutador[rutaPrincipal] && enrutador[rutaPrincipal][metodo]) {
        handler = enrutador[rutaPrincipal][metodo]; // Me busca en enrutador la función a realizar de acuerdo a la ruta
      } else {
        handler = enrutador.noEncontrado;
      }
  
      //4.0 ejecutar handler (Mejador)
      if (typeof handler === 'function') {
        handler(data, (status = 200, mensaje) => {
          const respuesta = JSON.stringify(mensaje);
          res.setHeader('Content-Type', "application/json"); // Se especifica el tipo de dato que se manda Imagen, PDF, Texto, etc
          res.writeHead(status);
          //Respuesta al cliente
          res.end(respuesta);
        })
      } 
    });
  };