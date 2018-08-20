var express = require('express');
var bcrypt = require('bcrypt');
var mdAutenticacion = require('../middlewares/autenticacion');

var app = express();
var Usuario = require('../models/usuario');

app.get('/',(req, res, next)=>{

    Usuario.find({}, 'nombre email  img role')
        .exec( (err, usuarios)=>{
            if(err){
                return  res.status(500).json({
                    ok:false,
                    message: 'error en base de datos cargando usuarios',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                usuarios: usuarios
            });
        })
});


app.post('/',mdAutenticacion.verificarToken, (req, res)=>{
    var body = req.body;
    const saltRounds = 10;
    const myPlaintextPassword = body.password;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
            var usuario = new Usuario({
                nombre: body.nombre,
                email: body.email,
                password: hash,
                img: body.img,
                role: body.role
            });
            usuario.save((err, usuarioGuardado)=>{
                if(err){
                    return  res.status(400).json({
                        ok:false,
                        message: 'error en base de datos al crear usuarios',
                        errors: err
                    });
                }
                res.status(201).json({
                    ok: true,
                    usuario: usuarioGuardado
                });
            })
        });
    });
   
})

app.put('/:id',mdAutenticacion.verificarToken, (req, res)=>{
    var id = req.params.id;
    var body = req.body;
    Usuario.findById(id, (err, usuario)=>{
        if(err){
            return  res.status(500).json({
                ok:false,
                message: 'error al buscar usuario',
                errors: err
            });
        }
        if(!usuario)
            return  res.status(400).json({
                ok:false,
                message: 'el usuario no existe',
                errors: {message: 'no existe un usuario con ese id'}
            });

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioGuardado)=>{
            if(err){
                return  res.status(400).json({
                    ok:false,
                    message: 'error al actualizar el usuario',
                    errors: err
                });
            }
            usuarioGuardado.password =':)';
            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });
        })
    })
    
})
app.delete('/:id',mdAutenticacion.verificarToken, (req, res)=>{

    var id = req.params.id;
    Usuario.findByIdAndRemove(id, (err, usuarioBorrado)=>{
        if(err){
            return  res.status(500).json({
                ok:false,
                message: 'error al borrar el usuario',
                errors: err
            });
        }
        if(!usuarioBorrado){
            return  res.status(400).json({
                ok:false,
                message: 'error no existe un usuario con ese id',
                errors: {message: 'No existe un usuario con ese id'}
            });
        }
        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });
    })
})
module.exports = app;