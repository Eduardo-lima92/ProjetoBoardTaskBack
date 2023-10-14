const mongoose = require('mongoose');
const validator = require('validator');

const esquema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: 'é obrigatorio',
        },
        email: {
            type: String,
            unique:true,
            required: 'é obrigatorio',
            lowercase: true,
            index: true,
            validate: {
                validator: (valorDigitado) => { return validator.isEmail(valorDigitado) },
                message: 'invalido!'
            }
        },
        senha: {
            type: String,
            required: 'é obrigatorio',
            select: false,
        },
    },
    {
        timestamps: true
    }
);

const EsquemaUsuario = mongoose.models.Usuario || mongoose.model('Usuario', esquema);
module.exports = EsquemaUsuario;