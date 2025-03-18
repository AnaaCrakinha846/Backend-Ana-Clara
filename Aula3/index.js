const express = require('express');
const userService = require ('./userService');

const app = express (); //nome qualquer para express
app.use(express.json());// vou habilitar json express

// rota para criar usuário

app.post("/users", (req, res) => {
    const {id, nome, email, senha, endereco, telefone, cpf} = req.body;
    if (!id || !nome || !email || !senha || !endereco || !telefone || !cpf){
        return res.status(400).json 
        ( {error:"Todos os campos são obrigatórios"})
    }
    const user = userService.addUser(nome,email, senha, endereco, telefone, cpf);
    res.status(200).json({user});
});

//rota para listar todos os usuários

app.get("/users", (req,res) => {
    try{
        res.json(userService.getUsers());
    }catch (erro){
        res.status(400).json({error: erro.message});
    }
});


//Rota para excluir um usuário pelo ID
app.delete("/users/:id", (req,res) => {
    const id = parseInt(req.params.id);
    //Converte o ID para número
    try{
        const resultado = userService.deleteUser(id);
res.status(200).json(resultado);//Retorna a mensagem de sucesso
} catch (erro){
    res.status(400).json({error: erro.message});
}
})

const port = 3000;
app.listen(port,() => {
    console.log("Servidor rodando na porta", port);
})
