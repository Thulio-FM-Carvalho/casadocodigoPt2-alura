//classe responsável por armazenar somente rotas referentes a livros

const LivroController = require("../controllers/LivroController"); //Importando a classe LivroController 
const livroController = new LivroController();                     //Instanciando a classe LivroController para ter acesso aos métodos dela

const BaseController = require("../controllers/BaseController"); //Importando a controller

const Livro = require("../models/Livro");       //Importando a classe modelo

module.exports = (app) => {

    const rotasLivro = LivroController.rotas(); //Vindo da classe LivroController
    
    //Middleware que só será executado pra todas as requisições cuja as urls batam exetamente com a chave que criamos
    app.use(rotasLivro.autenticadas, function(req, resp, next){
        //Se o usuário estiver autenticado, siga em frente
        if (req.isAuthenticated()){
            next();
        } else {
            resp.redirect(BaseController.rotas().login);
        }
    });

    app.get(rotasLivro.lista, livroController.lista());

    //route(), é um método do express que agrega rotas 
    //Ela recebe a URL como parâmetro
    app.route(rotasLivro.cadastro)
        .get(livroController.formularioCadastro())
        .post(Livro.validacoes(), livroController.cadastra())
        .put(livroController.edita());

    app.get(rotasLivro.edicao, livroController.formularioEdicao());

    app.delete(rotasLivro.delecao, livroController.remove());
};