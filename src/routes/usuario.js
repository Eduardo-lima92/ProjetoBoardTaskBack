const express = require('express');
const conectarBancoDados = require('../middlewares/conectarBD');
const tratarErrosEsperados = require('../../functions/TratarErrosEsperados');
const router = express.Router();
const bcrypt = require('bcrypt');
const EsquemaUsuario = require('../models/usuario');

/* GET users listing. */
router.post('/criar', conectarBancoDados , async function(req, res,) {
  try{
    // #swagger.tags = ['Usuario']
    let {nome, email, senha} = req.body
    const numeroVezesHash = 10;
    const senhaHash = await bcrypt.hash(senha, numeroVezesHash);
    const respostaBD =  await EsquemaUsuario.create({nome, email, senha : senhaHash})

    res.status(200).json({
      status: "OK",
      statusMensagem: "Usuario criado com sucesso.",
      resposta: respostaBD
    })
  }catch (error) {
    if(String(error).includes("email_1 dup key")){
      return tratarErrosEsperados(res, "Error: Já existe uma conta com esse e-mail!");
    }
    return tratarErrosEsperados(res, error);

  }
});

module.exports = router;
