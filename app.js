const express = require('express')
const produtoRouter = require("./router/produto_router")
const usuarioRouter = require('./router/usuario_router')
const loggerMiddleware = require("./middleware/logger_middleware")
const app = express()
const port = 3000

app.use(express.json()) // for parsing application/json

app.use(loggerMiddleware.realizaLog);

app.get('/',(req, res) => {
  res.send('Hello World!')
})

app.use('/api/usuarios', usuarioRouter);

app.use("/api/produtos", produtoRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
