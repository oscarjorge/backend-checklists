var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;

var rolesValidos = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} no es un rol válido'
}

var usuarioSchema = new Schema({
    nombre: {type: String, required: [true, 'El nombre del usuario es requerido']},
    email: {type: String, unique:true, required: [true, 'El correo del usuario es requerido']},
    password: {type: String, required: [true, 'La contraseña del usuario es requerido']},
    img: {type: String, required:false},
    role: {type: String, required:true, default: 'USER', enum: rolesValidos}
});

usuarioSchema.plugin(uniqueValidator, {message: '{PATH} debe de ser único.'})

module.exports = mongoose.model('Usuario', usuarioSchema);