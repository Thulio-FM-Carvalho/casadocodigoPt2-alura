//Importando as dependências
const uuid = require("uuid/v4");                            
const sessao = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy

const UsuarioDao = require("../app/infra/usuario-dao");    //Importand o DAO
const db = require("./database");                          //Importando o db

module.exports = function(app){
    //Configuração da sessão de autenticação
    //LocalStrategy recebe dois parâmetros, 
    passport.use(new LocalStrategy(
        {
            usernameField: "email", //Campo utilizado pra pegar o campo do usuário
            passwordField:  "senha"
        }, 
        //Done só será executado quando terminarmos o processo de autenticação do usuário
        function(email, senha, done){
            const usuarioDao = new usuarioDao(db); //Instanciando o DAO
            
            //Vai buscar o email que recebemos do formulario de login
            //O método vai retornar uma promise
            usuarioDao.buscaPorEmail(email) 
                        //Se der certo, recebe o usuário e faz o processo de autenticação
                        .then(function(usuario){
                            //Se o usuário não existir ou a senha for incorreta, faça
                            if(!usuario || senha != usuario.senha) {
                                //null: Informa alguma coisa se tiver dado algum erro na aplicação
                                //false: Não consegui autenticar nenhum usuário
                                //{} passa um objeto javascript contendo uma informação do que aconteceu
                                return done(null, false, {
                                    mensagem: "Login e senha incorretos!"
                                });
                            }

                            return done(null, usuario);
                        })
                        .catch(function(erro){
                            done(erro, false);
                        });
        } 
    ));
};