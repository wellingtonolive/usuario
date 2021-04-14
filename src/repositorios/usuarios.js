const query = require('../infraEstrutura/database/queries')

class Usuario{

    adiciona(usuario){
        const sql = `INSERT INTO usuarios SET ?`
        return query(sql,usuario)
    }

    lista(){
        const sql = `select * from usuarios`
        return query(sql)
    }

    buscaPorID(ID){
        const sql = `SELECT * FROM usuarios WHERE id =${ID}`
        return query(sql,ID)
    }

    atualizar(ID, valores, res){
        const sql = `UPDATE usuarios SET ? WHERE id=${ID}`
        return query(sql,valores)
    }

    deleta(ID){
        const sql = `DELETE FROM usuarios WHERE id=${ID}`
        return query(sql,ID)
    }

}

module.exports = new Usuario()