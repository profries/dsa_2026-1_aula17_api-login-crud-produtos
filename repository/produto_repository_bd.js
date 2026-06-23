const bd = require('./bd')

async function listar() {
    //conectar
    const cliente = await bd.connect();

    //executar query
    const sql = `
    SELECT prod.id, prod.nome, prod.preco,
    cat.id as cat_id, cat.nome as cat_nome
    FROM produtos prod 
    INNER JOIN categorias cat
    ON prod.categoria_id = cat.id
    ORDER BY id
    `;

    const res = await cliente.query(sql);
    const listaProdutos = res.rows.map(produto => {
        return {
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            categoria: {
                id: produto.cat_id,
                nome: produto.cat_nome
            }
        }
    });
    

    //liberar a conexao
    await cliente.release();

    return listaProdutos;
}

async function inserir(produto) {
    //conectar
    const cliente = await bd.connect();
    //executar query
    const sql = "INSERT INTO produtos(nome, categoria_id, preco) VALUES ($1, $2, $3) RETURNING *";
    const values = [produto.nome, produto.idCategoria, produto.preco];
    const result = await cliente.query(sql, values);
    const produtoInserido = result.rows[0];
    //liberar a conexao
    await cliente.release();

    return produtoInserido;
}

async function buscarPorId(id) {
    const cliente = await bd.connect();
    const sql = `
        SELECT prod.id, prod.nome, prod.preco, 
        cat.id as cat_id, cat.nome as cat_nome
        FROM produtos prod
        INNER JOIN categorias cat 
        ON prod.categoria_id=cat.id WHERE prod.id=$1`;
    const values = [id];
    const result = await cliente.query(sql, values);
    const produtoEncontrado = result.rows[0];
    cliente.release();

    if(produtoEncontrado) {
        return {
            id: produtoEncontrado.id,
            nome: produtoEncontrado.nome,
            preco: produtoEncontrado.preco,
            categoria: {
                id: produtoEncontrado.cat_id,
                nome: produtoEncontrado.cat_nome
            }
        }
    }
    return (undefined);
}

async function atualizar(id, produto) {
    const sql = 'UPDATE produtos set nome=$1, categoria_id=$2, preco=$3 WHERE id=$4 RETURNING *'
    const values = [produto.nome, produto.idCategoria, produto.preco, id];

    const cliente = await bd.connect();
    const result = await cliente.query(sql, values);
    const produtoAtualizado = result.rows[0];
    cliente.release();
    return (produtoAtualizado);
}

async function deletar(id) {
    const sql = 'DELETE FROM produtos WHERE id=$1 RETURNING *'
    const values = [id];

    const cliente = await bd.connect();

    const result = await cliente.query(sql, values);

    await cliente.release();

    const produtoDeletado = result.rows[0];
    return (produtoDeletado);
}

module.exports = {
    listar,
    inserir,
    buscarPorId,
    atualizar,
    deletar
}

