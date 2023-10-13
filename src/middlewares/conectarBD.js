const mongoose = require('mongoose');
const tratarErrosEsperados = require('../../functions/TratarErrosEsperados');


async function conectarBancoDados(req = null, res = null, next = null) {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useunifiedTopology: true});
        console.log('conectado ao banco de dados!');
        try{ next() ;} catch {};
        return mongoose;
    }   catch (error) {
        console.error(error);
        tratarErrosEsperados(res, 'Error: Erro ao conectar ao banco de dados')
        return error;
    }
}

module.exports = conectarBancoDados