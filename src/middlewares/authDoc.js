async function authDocProducao(req, res, next) {
    const { senhaDigitada } = req.body;

    if(req.headers.host.includes("localhost") || req.originalUrl !== "/doc/") {
        //usuario esta no localhost
        return next();
    }

    if (senhaDigitada === process.env.SWAGGER_SENHA_DOC){
        //usuario digitou a senha certa
        return next();
    }

    if (senhaDigitada) {
        //usuario digitou a senha errada
        res.status(401).set('Content-Type', 'text/html');
        res.send (Buffer.from(`
            <form method="post">
                <p style="color: red; ">Senha errada!</p>
                <label for="SenhaDigitada">Senha da documentação: </label>
                <input type="password" name="senhaDigitada" id="senhaDigitada" />
                <button type=submit">Entrar</button>
            </form>        
        `))
    } else{
        //se o usuario ainda não digitou a senha e ests em modo produção
        res.status(200).set('Content-Type', 'text/html');
        res.send (Buffer.from(`
            <form method="post">
                <label for="SenhaDigitada">Senha da documentação: </label>
                <input type="Password" name="senhaDigitada" id="senhaDigitada" />
                <button type=submit">Entrar</button>
            </form>        
        `))
    }
}

module.exports = authDocProducao;