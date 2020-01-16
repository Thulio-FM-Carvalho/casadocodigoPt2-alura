//Importando o express-validator
//check: o que será checado
//validationResult: resultado da validação
const { check, validationResult } = require('express-validator');

const LivroController = require("../controllers/LivroController"); //Importando a classe LivroController 
const livroController = new LivroController();                     //Instanciando a classe LivroController para ter acesso aos métodos dela

const BaseController = require("../controllers/BaseController"); //Importando a classe BaseController
const baseController = new BaseController();                     //Instanciando a classe para o acesso aos métodos

module.exports = (app) => {

    const rotasBase = BaseController.rotas();   //Vindo da classe BaseController
    const rotasLivro = LivroController.rotas(); //Vindo da classe LivroController

    app.get(rotasBase.home, baseController.home());
    
    app.get(rotasLivro.lista, livroController.lista());

    app.get(rotasLivro.cadastro, livroController.formularioCadastro());

    app.get(rotasLivro.edicao, livroController.formularioEdicao());
    
    //Aplicando uma checagem no titulo cujo o campo tenha no minimo 5 caracteres
    //isCurrency(): Se é um valor monetário
    app.post(rotasLivro.lista,[
            check('titulo').isLength({ min: 5 }).withMessage("O título precisa ter no mínimo 5 caracteres!"), 
            check('preco').isCurrency().withMessage("O preço precisa ter um valor monetário!")
            ], livroController.cadastra());

    app.put(rotasLivro.lista, livroController.edita());

    app.delete(rotasLivro.delecao, livroController.remove());
};