var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
var app = express();
var Usuario = require('../models/usuario');


app.post('/', (req, res)=>{
    var body = req.body;

    Usuario.findOne({email: body.email}, (err, usuario)=>{
        if(err){
            return  res.status(500).json({
                ok:false,
                message: 'error al buscar usuario',
                errors: err
            });
        }
        if(!usuario)
            return res.status(400).json({
                ok:false,
                message: 'Credenciales incorrectas',
                errors: err
            });
        if(!bcrypt.compareSync(body.password, usuario.password))
            return res.status(400).json({
                ok:false,
                message: 'Credenciales incorrectas',
                errors: err
            });
        usuario.password = ':)';
        //Crear un token
        var token = jwt.sign({usuario:usuario}, SEED, {expiresIn:14400});
        res.status(200).json({
            ok: true,
            usuario:usuario,
            token: token,
            id: usuario._id
        });
    })

    
})


module.exports = app;