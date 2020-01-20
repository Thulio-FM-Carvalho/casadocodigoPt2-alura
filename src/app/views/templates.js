//Código responsável por amarrar os dois arquivos "index.js" da pasta "base" e da "livros"
module.exports = {
    base: require("./base/index"),      //Template marko.js
    livros: require("./livros/index")   //Template marko.js
}