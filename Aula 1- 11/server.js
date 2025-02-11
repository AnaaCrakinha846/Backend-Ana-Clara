const express = require("express");

const mela = express();

const port = 3000;

mela.get("/", (req, res) => {
res.send("Olá, como você está? este servidor está rodanso com express");
});

mela.get("/home", (req, res) => {
    res.send("Olá, como você está? este servidor está rodanso com express");
    });


    mela.get("/login", (req, res) => {
        res.send("Olá, como você está? este servidor está rodanso com express");
        });


mela.listen(port, () => { 
    console.log("Servidor rodando na porta", port);
});

