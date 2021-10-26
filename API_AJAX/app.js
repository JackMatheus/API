const express = require('express');
const request = require('request');
const rp = require('request-promise');

var router = express.Router();

const app = express();

app.set("views", "./")
app.set("view engine", "ejs")

const url = "https://sistemashomologacao.suafaculdade.com.br/processoseletivo/administrativopresencial/api/alunos";
// const url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY="; (falta a key, por isso não é possível acessar o endpoint)
let config = {
  url: url,
  headers: {
    'Content-Type': 'application/data',
    'Accept': 'application/data'
  },
  method: "GET"
};

app.get('/', (req, res) => {

  return rp(config).then(function (data) {
    res.render('index', {
        // aluno: JSON.parse(data)
        
    })
  })
});
app.get('/alunos', (req, res) => {
  
  return rp(config).then(function (data) {
    res.json(JSON.parse(data))
  })
})

app.listen(3000, () => {
  console.log("Servidor rodando na porta: 3000")
});

module.exports = app;





