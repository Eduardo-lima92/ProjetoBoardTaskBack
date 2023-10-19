const express = require('express');
const conectarBancoDados = require('../middlewares/conectarBD');
const tratarErrosEsperados = require('../../functions/TratarErrosEsperados');
const router = express.Router();
const authUser = require('../middlewares/authUser');
const EsquemaTarefa = require('../models/tarefa');

/* GET users listing. */
router.post('/criar', authUser, conectarBancoDados , async function(req, res,) {
  try{
    // #swagger.tags = ['Tarefa']
    let {posicao, titulo, descricao, status, dataEntrega} = req.body;
    const usuarioCriador = req.usuarioJwt.id;
    const respostaBD =  await EsquemaTarefa.create({posicao, titulo, descricao, status, dataEntrega, usuarioCriador});

    res.status(200).json({
      status: "OK",
      statusMensagem: "Tarefa criada com sucesso.",
      resposta: respostaBD
    })
  }catch (error) {
      return tratarErrosEsperados(res, error);
    }
    

  });


module.exports = router;
