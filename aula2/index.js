class Usuario {[]
        constructor(nome, email, senha) {
        this.nome = nome;
        this.email = email;
        this._senha = senha; //atributo privado
    
    }
}

Authenticar(senha){
    return senha === this._senha;

}

alterarSenha(novaSenha){
    this._senha = novaSenha;
    console.log('senha alterada com sucesso')

}
//exemplo de uso

const usuario1= new Usuario('Luiz', 'luiz@gmail.com', '1234')
console.log(usuario1.autenticar('1234'));
console.log(usuario.autenticar('123544'));


class admin extends usuario {
    constructor(nome, email, senha, nivelAcesso,){
        super(nome, email, senha);
        this.nivelAcesso;
    
    }

    banirUsuario(usuario){
        console.log(`$`usuario.nome) foi banido do sistema $(this.nome)´)
        
    }
}


