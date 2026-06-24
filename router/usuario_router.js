const express = require('express')
const router = express.Router();

const usuarioController = require('../controller/usuario_controller')

//endpoint: /usuarios
router.get('/', usuarioController.listar)
router.post('/', usuarioController.inserir)

module.exports = router;