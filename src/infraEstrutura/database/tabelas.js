class Tabelas {
    init(conexao) {
        this.conexao = conexao;
        this.cadastrarUsuario()
    }

    cadastrarUsuario() {
        const sql = `
        CREATE TABLE IF NOT EXISTS usuarios 
        (
            id		int not null auto_increment,
            nm_login varchar(50) not null,
            nm_email varchar(100) not null,
            nm_senha varchar(50) not null,
            nm_Pessoa varchar(100) not null,
            nm_sobrenome varchar(100) not null,
            nr_cpf	 varchar(15) not null, 
            dataNascimento  datetime not null,
            dataCadastro    datetime not null,
            imagemPerfil    varchar(200),
            perfilUsuario   varchar(10),
            PRIMARY KEY (id)
        )
        `
        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log(erro)
            }
            else {
                console.log('Tabela de Usuários Criada com Sucesso')
            }
        });

    }

}


module.exports = new Tabelas