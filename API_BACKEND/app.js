const express = require('express');
const request = require('request');
const rp = require ('request-promise');

var router = express.Router();

const app = express();

app.set("views", "./")
app.set("view engine", "ejs")

app.get('/', (req, res) => {
  const url = "https://sistemashomologacao.suafaculdade.com.br/processoseletivo/administrativopresencial/api/alunos"; 
  let config = {url: url,
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                method: "GET"
  };
 return rp (config).then(function(data){
   res.render('index',{
    aluno: JSON.parse(data)
   })
 })
});

 app.listen(3000, () => {
  console.log("Servidor rodando na porta: 3000")
});

module.exports = app;

