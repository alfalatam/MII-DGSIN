require('dotenv').config()
// modulo para crear un servidor web
var express = require('express');
// modulo para manejar rutas de archivos
var path = require('path');


var fs = require('fs');

var bp = require('body-parser');
// Este modulo se encarga de permitir peticiones desde otros dominios
var cors = require('cors');
//constantes
const { error } = require('console');
// Ruta por defecto
const BASE_API = "/api/v1";



// Crear una instancia de express
var app = express();

//usando un middelware con un ruta estatica
// app.use(BASE_API + "/", express.static(path.join(__dirname + "/public")));
app.use("/", express.static(path.join(__dirname + "/public")));


// usando bp para parsear el cuerpo de las peticiones
app.use(bp.json());
//este metodo permite   
app.use(cors());

//var champsAPI = require('./champsAPI');
var champsAPI= require('./champsAPI');

//champsAPI.register(app, db); // GET a collection
champsAPI.register(app); // GET a collection
    
//control de eventos y errores
app.listen(process.env.PORT || 8080, () =>{
    console.log("Server ready");
}).on(error, (e) =>{ 
    console.log("Server not ready: "+ e );
});


var request = require('request');
var apiServerHost2 = 'https://api.pandascore.co';
app.use("/proxyXX", (req, res) => {

  var url = apiServerHost2 + req.url;
  console.log('piped: '+req.baseUrl + req.url);
  req.pipe(request(url)).pipe(res);

});










