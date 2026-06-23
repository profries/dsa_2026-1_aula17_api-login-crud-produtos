const bd = require('./bd')

async function listar() {
    //conectar
    const cliente = await bd.connect();

    //executar query
    const res = await cliente.query("SELECT * FROM usuarios ORDER BY id");
    const listaUsuarios = res.rows; 

    //liberar a conexao
    await cliente.release();

    return listaUsuarios;
}

async function inserir(usuario) {
    //conectar
    const cliente = await bd.connect();
    //executar query
    const sql = "INSERT INTO usuarios(email, senha) VALUES ($1, $2) RETURNING *";
    const res = await cliente.query(sql, [usuario.email, usuario.senha]);
    //liberar a conexao
    await cliente.release();
    const usuarioInserido = res.rows[0];
    return usuarioInserido;
}

async function buscarPorId(id) {
    const cliente = await bd.connect();
    const sql = "SELECT * FROM usuarios WHERE id=$1";
    const result = await cliente.query(sql, [id]);
    const usuarioEncontrado = result.rows[0];
    cliente.release();

    return (usuarioEncontrado);
}

async function buscarPorEmail(email) {
    const cliente = await bd.connect();
    const sql = "SELECT * FROM usuarios WHERE email=$1";
    const result = await cliente.query(sql, [email]);
    const usuarioEncontrado = result.rows[0];
    cliente.release();

    return (usuarioEncontrado);
}


module.exports = {
    listar,
    inserir,
    buscarPorId,
    buscarPorEmail
}

