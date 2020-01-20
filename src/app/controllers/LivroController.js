//Importando o express-validator
//check: o que será checado
//validationResult: resultado da validação
const { check, validationResult } = require('express-validator');
const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

const templates = require("../views/templates"); //Importando o módulo contendo os templates

//Classe controller
class LivroController {

    //Método que retorna os Objetos de todas as rotas relativas aos livros
    static rotas(){
        return {
            lista: "/livros",
            cadastro: "/livros/form",
            edicao: "/livros/form:id",
            delecao: "/livros/:id"
        };
    }

    //Método que faz a listagem de livros
    lista() {
        return function(req, resp) {

            const livroDao = new LivroDao(db);
            livroDao.lista()
                    .then(livros => resp.marko(
                        templates.livros.lista, //Importando o template
                        {
                            livros: livros      //Dados a serem passados pro template
                        }
                    ))
                    .catch(erro => console.log(erro));
        }
    }

    formularioCadastro(){
        return function(req, resp) {
            resp.marko(require('../views/livros/form/form.marko'), { livro: {} });
        }
    }

    formularioEdicao(){
        return function(req, resp) {
            const id = req.params.id;
            const livroDao = new LivroDao(db);
    
            livroDao.buscaPorId(id)
                    .then(livro => 
                        resp.marko(
                            require('../views/livros/form/form.marko'), 
                            { livro: livro }
                        )
                    )
                    .catch(erro => console.log(erro));
        }
    }

    cadastra(){
        return function(req, resp) {
            
            console.log(req.body);
            const livroDao = new LivroDao(db);
            
            //validationResult: Retorna os erros que acontecem na requisição
            const erros = validationResult(req);

            //Se aconteceu algum erro, volta para a página de formulário
            //Se estiver vazio
            if(!erros.isEmpty()){
                return resp.marko(require('../views/livros/form/form.marko'),
                { 
                    livro: {},
                    errosValidacao: erros.array() //devolve um array de erros 
                

                });
            }

            livroDao.adiciona(req.body)
                    .then(resp.redirect(LivroController.rotas().lista)) //LivroController.rotas().lista Chamando o método rotas que retorna o /lista
                    .catch(erro => console.log(erro));
        }
    }

    edita(){
        return function(req, resp) {
            console.log(req.body);
            const livroDao = new LivroDao(db);
            
            livroDao.atualiza(req.body)
                    .then(resp.redirect(LivroController.rotas().lista)) //LivroController.rotas().lista Chamando o método rotas que retorna o /lista
                    .catch(erro => console.log(erro));
        }
    }

    remove(){
        return function(req, resp) {
            const id = req.params.id;
    
            const livroDao = new LivroDao(db);
            livroDao.remove(id)
                    .then(() => resp.status(200).end())
                    .catch(erro => console.log(erro));
        }
    }
}

//Explortando a classe
module.exports = LivroController;