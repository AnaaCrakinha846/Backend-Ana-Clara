const User = require("./user");
const path = require('path'); //modulo para maniplular caminhos
const fs = require('fs'); //módulo para manipular arquivos fille sytem ,
const bcrypt = require('bcryptjs')
const { get } = require("http");
const mysql = require("./mysql")

// toda vez que a lista começar com o valor fixo, não precisa colocar aqui
//mas se quer comecar com um outro id, precida por aqui

class userService {
    constructor() {
        this.filePath = path.join(__dirname, 'user.json');//caminho do arquivo 
        this.users = this.loadUser(); //array pra armazenar usuários 
        this.nextID = this.getNexID(); //contador e gerador de ID
    }

  

    

    async addUser(nome, email, senha, endereco, telefone, cpf) { // função assincrona ela espera algo acontecer dentro para funcionar. Precisa de um sincronismo
        try {

            const senhaCripto = await bcrypt.hash(senha, 10);            //o await vai esperar a função rodar 
            const resultados = await mysql.execute(
                `INSERT INTO usuario (Nome, Email, Senha, Endereco, Telefone, CPF)
                  VALUES(?, ?, ?, ?, ?, ?);`,
                  [nome, email, senhaCripto, endereco, telefone, cpf]
              )
              return resultados

        } catch (erro) {
            
            throw erro;
        }
    }

    getUser() {
        try {
            return this.users
        } catch (erro) {
            console.log("Erro ao carregar arquivo", erro)
        }
    }

    deleteUser(id) {
        try {
            this.users = this.users.filter(user => user.id !== id); //cria um novo aray, não colocando o id selecionado 
            this.saveUsers();
        }
        catch {
            console.log("Erro ao carregar arquivo", erro)
        }
    }

   
            
         async updateUser(id, nome, email, senha, endereco, telefone, cpf) {
                try {
                    const senhaCripto = await bcrypt.hash(senha, 10);

                    // Atualiza os dados no banco de dados
                    const resultados = await mysql.execute(
                        `UPDATE usuario
                         SET nome = ?, email = ?, telefone = ?, endereco = ?, cpf = ?, senha = ?
                         WHERE id = ?;`,
                        [nome, email, telefone, endereco, cpf, senha, id]
                    );
            
                    return resultados;
                } catch (erro){
                    console.log("Erro ao atualizar o usuário", erro);
                    throw erro;
                }
            }
            
        }


    

module.exports = new userService();