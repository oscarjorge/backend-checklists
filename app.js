//Requires. IMportamos las librerias necesarias
var express = require(`express`);
var mongoose = require('mongoose');
//Inicialización de variables

var app=express();

//Conexión con la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/checklists', (err,res)=>{
    if(err)throw err;
    console.log('Base de datos online');
})

//routing
app.get('/',(req, res, next)=>{
    res.status(200).json({
        ok:true,
        message: 'petición realizada correctamente'
    });
})


//Levantamos el server
app.listen(3000, ()=>{

    console.log('express levantado y corriendo en el puerto 3000');
})