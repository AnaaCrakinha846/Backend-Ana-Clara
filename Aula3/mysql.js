const mysql = require('mysql');

const pool = mysql.createPool({ //conexão da database pelo workbench
    "user": "root",
    "password": "root",
    "database": "sakila",
    "host": "localhost",
    "port": "3306"
})

exports.execute = (query, param = [], varPool=pool) => {
    return new Promise ((resolve, reject) =>{ //promise faz o código esperar a "promessa" pra rodar o resto
        varPool.query(query, param, (error, results) => {
            if(error){
                reject(error)
            } else{
                resolve(resolve)
            }
        })
    }) 
}

exports.pool = pool
