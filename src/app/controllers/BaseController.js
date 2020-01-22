const templates = require("../views/templates"); //Importando os templates

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
            resp.marko(
                templates.base.home
            );
        }
    }

    //Método que redireciona para a página de Login 
    login() {
        return function(req, resp) {
            resp.marko(templates.base.login);
        };
    }

    efetuaLogin() {
        return function(req, resp){
            
        };
    }

}

//Exportando a classe
module.exports = BaseController;