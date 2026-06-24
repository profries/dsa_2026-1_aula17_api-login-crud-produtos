const jwt = require("jsonwebtoken");

const SECRET = "Sen@crs2026";

function criarToken(payload) {
    const token = jwt.sign(payload, SECRET, {expiresIn: '1h'});
    return token;
}

module.exports = {
    criarToken
}