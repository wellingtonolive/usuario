const customExpress = require('./config/customExpress')
const conexao = require('./src/infraEstrutura/database/conexao')
const Tabelas = require('./src/infraEstrutura/database/tabelas')

conexao.connect( erro => {
    if(erro){
        console.log(erro)
    }
    else {
        console.log('Conexão Realizada com Sucesso')
        const app = customExpress()
        Tabelas.init(conexao);
        app.listen(3000,() => console.log('Servidor rodando da porta 3000'))
    }

})



