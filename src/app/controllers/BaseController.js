class BaseController {

    //Método que retorna os Objetos de todas as rotas relativas ao home ("Início")
    static rotas() {
        return {
            home: "/"
        };
    }

    //Método que redireciona para o home (início)
    home(){
        return function(req, resp) {
            resp.marko(
                require('../views/base/home/home.marko')
            );
        }
    }

}

//Exportando a classe
module.exports = BaseController;