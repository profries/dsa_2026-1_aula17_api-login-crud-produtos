function realizaLog(req, res, next)
{
    console.log("Endpoint: "+req.method + " "+req.path);
    requestTime = Date.now();
    next();
    res.on('finish', () => {
        console.log("Status de Retorno: ",res.statusCode);
        let tempoExec = Date.now() - requestTime;
        console.log("Tempo de Execução: ", tempoExec+"ms");    
    });
}

module.exports = {
    realizaLog
}