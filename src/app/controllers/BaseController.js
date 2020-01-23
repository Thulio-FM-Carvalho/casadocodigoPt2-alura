const templates = require("../views/templates"); //Importando os templates
const LivroController = require("./LivroController")

class BaseController {

    //Método que retorna os Objetos de todas as rotas relativas ao home ("Início")
    static rotas() {
        return {
            home: "/",
            login: "/login"
        };
    }

    //Método que redireciona para o home (início)
    home(){
        return function(req, resp) {
            resp.marko(templates.base.home);
        }
    }

    //Método que redireciona para a página de Login 
    login() {
        return function(req, resp, next) {
            console.log("Erro");
            resp.marko(templates.base.login);
        };
    }
    //Lógica de login
    efetuaLogin() {
        return function(req, resp, next){
            
            //Pegando o passport da requisição
            const passport = req.passport;

            //Authenticate: Responsável por executar a estratégia de autenticação que foi configurada na classe "SessaoAutenticacao.js"
            //Authenticate recebe dois parametros: "local": autenticação local e o outro uma função callback
            passport.authenticate("local", function(erro, usuario, info){
                //Se tiver alguma informação, continua na página de login
                if (info){
                    return resp.marko(templates.base.login);
                }

                //Se tiver algum erro, faça
                if (erro){
                    return next(erro);
                }

                //Adicionando o usuário na sessão
                req.login(usuario, function(erro){
                    //Se anconteceu algum erro no processo de serialização
                    if (erro){
                        return next(erro);
                    }

                    //Se fez o login corretamente, redireciona o usuário para a página de listagem de livros
                    return resp.redirect(LivroController.rotas().lista);
                });
            })(req, resp, next);
        };
    }

}

//Exportando a classe
module.exports = BaseController;