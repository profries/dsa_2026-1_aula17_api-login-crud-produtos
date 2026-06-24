const jwt = require("jsonwebtoken");

const SECRET = "Sen@crs2026";

function criarToken(payload) {
    const token = jwt.sign(payload, SECRET, {expiresIn: '1h'});
    return token;
}

function validarToken(token) {
    try{
        let data = jwt.verify(token, SECRET);
        return data;
    } catch(err) {
        throw err;
    }
    
}

module.exports = {
    criarToken,
    validarToken
}