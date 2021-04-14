const mySQL = require('mysql');

const conexao = mySQL.createConnection({
    host: 'localhost',
    port: 3306,
    user:'root',
    password:'admin',
    database:'api_dieta'
})

module.exports = conexao