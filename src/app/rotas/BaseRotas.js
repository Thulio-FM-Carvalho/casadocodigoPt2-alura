//classe responsável por armazenar somente rotas básicas referentes a aplicação

const BaseController = require("../controllers/BaseController"); //Importando a classe BaseController
const baseController = new BaseController();                     //Instanciando a classe para o acesso aos métodos

module.exports = (app) => {

    const rotasBase = BaseController.rotas();   //Vindo da classe BaseController

    app.get(rotasBase.home, baseController.home());
    
};