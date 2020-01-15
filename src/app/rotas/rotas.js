//Importando o express-validator
//check: o que será checado
//validationResult: resultado da validação
const { check, validationResult } = require('express-validator');
const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

 

module.exports = (app) => {
    app.get('/', function(req, resp) {
        resp.marko(
            require('../views/base/home/home.marko')
        );
    });
    
    app.get('/livros', function(req, resp) {

        const livroDao = new LivroDao(db);
        livroDao.lista()
                .then(livros => resp.marko(
                    require('../views/livros/lista/lista.marko'),
                    {
                        livros: livros
                    }
                ))
                .catch(erro => console.log(erro));
    });

    app.get('/livros/form', function(req, resp) {
        resp.marko(require('../views/livros/form/form.marko'), { livro: {} });
    });

    app.get('/livros/form/:id', function(req, resp) {
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
    });
    
    //Aplicando uma checagem no titulo cujo o campo tenha no minimo 5 caracteres
    //isCurrency(): Se é um valor monetário
    app.post('/livros',[
            check('titulo').isLength({ min: 5 }).withMessage("O título precisa ter no mínimo 5 caracteres!"), 
            check('preco').isCurrency().withMessage("O preço precisa ter um valor monetário!")
            ], function(req, resp) {
            
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
                    .then(resp.redirect('/livros'))
                    .catch(erro => console.log(erro));
        });

    app.put('/livros', function(req, resp) {
        console.log(req.body);
        const livroDao = new LivroDao(db);
        
        livroDao.atualiza(req.body)
                .then(resp.redirect('/livros'))
                .catch(erro => console.log(erro));
    });

    app.delete('/livros/:id', function(req, resp) {
        const id = req.params.id;

        const livroDao = new LivroDao(db);
        livroDao.remove(id)
                .then(() => resp.status(200).end())
                .catch(erro => console.log(erro));
    });
};