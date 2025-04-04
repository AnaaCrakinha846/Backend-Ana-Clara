const User = require("./user"); 
const path = require("path");
const fs = require("fs");
const { json } = require("express");
const bcrypt = require("bcryptjs");

class userService {
    constructor(){
        this.filePath = path.join(__dirname, 'user.json');    
        this.users = this.loadUsers();
        this.nextID = this.getNextId();
    }

    loadUsers(){
        try{
            if (fs.existsSync(this.filePath)){
                const data = fs.readFileSync(this.filePath);
                return JSON.parse(data);
            }
        } catch (erro){
            console.log("Erro ao carregar arquivo", erro);
        }
        return [];
    }

    getNextId(){
        try{
            if(this.users.length === 0) return 1;
            return Math.max(...this.users.map(user => user.id)) + 1;
        } catch (erro){
            console.log("Erro ao buscar o id", erro);
        }
    }

    saveUsers(){
        try{
            fs.writeFileSync(this.filePath, JSON.stringify(this.users));
        } catch (erro){
            console.log('Erro ao salvar arquivo');
        }
    }


    async addUser(nome, email, senha, endereco, telefone, cpf){

        console.log(nome, email, senha, endereco, telefone, cpf);
        
        try {

            const cpfexistente = this.users.some(user => user.cpf === cpf);
            if (cpfexistente) {
                throw new error("CPF já cadastrado em seu login!")
            }

            if (!nome || !email || !senha || !endereco || !telefone || !cpf) {
                throw new Error("Todos os campos são obrigatórios!");
            }

            const senhacriptografada = await bcrypt.hash(senha, 10);
            // Verificação de campos obrigatórios
         

            // Criação de um novo usuário com os dados fornecidos
            const user = new User(this.nextID++, nome, email, senhacriptografada, endereco, telefone, cpf);
            
            
            // Adiciona o usuário ao array
            this.users.push(user);
            
            // Salva as mudanças no arquivo
            this.saveUsers();

            return user;
        } catch (erro) {
            console.log("Erro ao adicionar usuário", erro);
        }
    }


    deleteUser(id){
        try{
            this.users = this.users.filter(user => user.id !== id);
            this.saveUsers();
        }catch(erro){
            console.log('Erro ao deletar usuário', erro)
        }
    }

    getUsers(){
        try{
            return this.users;
        } catch(erro){
            console.log("Erro ao buscar usuários", erro);
        }
    }
}

module.exports = new userService;