const livroRotas = require("./LivroRotas"); //Importando as subrotas
const baseRotas = require("./BaseRotas");   //Importando as subrotas

module.exports = (app) => {
    livroRotas(app); //Recebendo como parâmetro o objeto do express
    baseRotas(app);
};