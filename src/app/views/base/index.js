//Irá exportar um objeto javascript contendo todos os templates dentro da pasta "base"
module.exports = {
    erro404: require("./erros/404.marko"),
    erro500: require("./erros/500.marko"),
    home: require("./home/home.marko"),
    lista: require("../livros/lista/lista.marko"),
    form: require("../livros/form/form.marko"),
    login: require("./login/login.marko")
}