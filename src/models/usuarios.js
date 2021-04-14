const moment = require('moment')

const conexao = require('../infraEstrutura/database/conexao')
const uploadArquivos = require('../infraEstrutura/arquivos/uploadDeArquivos')
const repositorio = require('../repositorios/usuarios')

class Usuarios {

    constructor(){

        this.valida = parametros => this.validacoes.filter(campo => {
            const { nome } = campo
            const parametros = parametros[nome]

            return !campo.valido(parametros)
        })


        this.dataNascimentoValida = ({dataCadastro,dataNascimento}) => moment(dataCadastro).isSameOrAfter(dataNascimento)
        this.usuarioValida = (tamanho) => tamanho >= 5

        this.validacoes = [

            {
                nome: 'nm_login',
                valido: this.usuarioValida,
                mensagem: 'Nome de Usuário deve ter no mínimo 5 caracteres'

            },
            {
                nome: 'dataNascimento',
                valido: this.dataNascimentoValida,
                mensagem: 'Data de Nascimento deve ser maior ou igual a data atual'
            }
            
        ]

    }

    cadastrar(usuario) {


        const dataCadastro = moment().format('YYYY-MM-DD')
        const dataNascimento = moment(usuario.dataNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD')

        const parametros = {
            data: {dataCadastro,dataNascimento},
            cliente: {tamanho: usuario.length}
        }

        const erros = this.valida(parametros)
        const existemErros = erros.length

        if (existemErros) {
            return new Promise((resolve,reject) => reject(erros))
        }
        else {

            uploadArquivos(usuario.imagemPerfil, usuario.nm_login, (erro, urlImagem) => {

                if (erro) {
                    return new Promise((resolve,reject) => reject(erro))

                } else {
                    const user = { ...usuario, dataCadastro, dataNascimento, imagemPerfil: urlImagem }

                    return repositorio.adiciona(user)
                        .then(resultados => {
                            return (user)
                        })
                }
            })
        }
    }

    lista(res) {
        return repositorio.lista()
    }

    buscaPorID(ID, res) {
        return repositorio.buscaPorID(ID)
            .then(resultados => {
                return (resultados)
            })
    }

    atualizar(id, valores, res) {
        if (valores.dataNascimento) {
            valores.dataNascimento = moment(valores.dataNascimento, 'DD/MM/YYYY').format('YYYY-MM-DD')
        }

        if(1===2){
            return new Promise((resolve,reject) => reject(erros))
        }
        else{
            return repositorio.atualizar(id,valores,res)
                    .then(resultados => {
                        return valores
                    })
        }
    }

    deleta(ID, res) {
        return repositorio.deleta(ID,res)
            .then(resultados => {
                return ID
            })        
    }


}

module.exports = new Usuarios;