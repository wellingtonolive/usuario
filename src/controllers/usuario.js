
const { parseTwoDigitYear } = require('moment')
const usuarios = require('../models/usuarios')
const Usuario = require('../models/usuarios')

module.exports = app => {
    app.get('/usuario', (req, res) => {
        Usuario.lista()
            .then(resultados => res.json(resultados))
            .catch(erros => res.status(400).json(erros))
    })

    app.get('/usuario/:id', (req, res) => {
        const ID = parseInt(req.params.id)
        Usuario.buscaPorID(ID)
            .then(usuario => {
                res.json(usuario)
            })
            .catch(erros => {
                res.status(400).json(erros)
            })
    })

    app.post('/usuario', (req, res) => {
        const novoUsuario = req.body
        Usuario.cadastrar(novoUsuario)
            .then(usuarioCadastrado => {
                res.status(201).json(usuarioCadastrado)
            })
            .catch(erros => {
                res.status(400).json(erros)
            })
    })

    app.patch('/usuario/:id', (req, res) => {
        const ID = parseInt(req.params.id)
        const valores = req.body
        Usuario.atualizar(ID, valores, res)
            .then(valores => {
                res.json(valores)
            })
            .catch(erros => {
                res.status(400).json(erros)
            })
    })

    app.delete('/usuario/:id', (req, res) => {
        const ID = parseInt(req.params.id)
        Usuario.deleta(ID, res)
            .then(ID => {
                res.json(ID)
            })
            .catch(erros => {
                res.status(400).json(erros)
            })

    })
}