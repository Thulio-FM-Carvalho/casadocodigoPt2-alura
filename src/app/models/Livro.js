//Importando o express-validator
//check: o que será checado
//validationResult: resultado da validação
const { check, validationResult } = require('express-validator');

//Classe modelo
class Livro {

    //Método que rertorna um array de validações
    static validacoes() {
        return [
            check('titulo').isLength({ min: 5 }).withMessage("O título precisa ter no mínimo 5 caracteres!"), //Aplicando uma checagem no titulo cujo o campo tenha no minimo 5 caracteres
            check('preco').isCurrency().withMessage("O preço precisa ter um valor monetário!")                //isCurrency(): Se é um valor monetário
        ];
    }
}

module.exports = Livro;