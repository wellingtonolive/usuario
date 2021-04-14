const fs = require('fs');
const path = require('path')

module.exports = (caminho, nmArquivo, callbackImagemCriada) => {
    const tiposValidos = ['jpg', 'png', 'jpeg']
    const tipo = path.extname(caminho)
    const tipoValido = tiposValidos.indexOf(tipo.substring(1)) !== -1

    if (tipoValido) {

        const urlImagem = `./assets/imagens/${nmArquivo}${tipo}`
        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(urlImagem))
            .on('finish', () => callbackImagemCriada(false, urlImagem))

    } else {
        const erro = 'Tipo de Arquivo Enviado é Inválido'
        callbackImagemCriada(erro)
    }


}

