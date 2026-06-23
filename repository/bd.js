const {Pool} = require('pg');

const pool = new Pool({
    user: "postgres",
    password: "senacrs",
    host:"localhost",
    port: 5432,
    database: "crud_produtos_categorias"    
});

async function connect() {
    return await pool.connect();
}

module.exports = {
    connect
}