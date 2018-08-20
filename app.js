//Requires. IMportamos las librerias necesarias
var express = require(`express`);
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//Inicialización de variables

var app=express();

//Body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Importacion de rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');

//Conexión con la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/checklistDB', (err,res)=>{
    if(err)throw err;
    console.log('Base de datos online');
})

//routing
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);


//Levantamos el server
app.listen(3000, ()=>{

    console.log('express levantado y corriendo en el puerto 3000');
})