const express = require('express')
const produtoRouter = require("./router/produto_router")
const usuarioRouter = require('./router/usuario_router')
const loggerMiddleware = require("./middleware/logger_middleware")
const loginController = require('./controller/login_controller')
const authMiddleware = require("./middleware/auth_middleware")
const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json

app.use(loggerMiddleware.realizaLog);

app.get('/',(req, res) => {
  res.send('Hello World!')
})

app.post('/api/login', loginController.realizarLogin );

app.use('/api/usuarios', usuarioRouter);

app.use(authMiddleware.verificarAcesso);
app.use("/api/produtos", produtoRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
