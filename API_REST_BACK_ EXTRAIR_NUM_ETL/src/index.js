const express = require('express');
const { Worker } = require('worker_threads');

const app = express();

const port = 3000;
let sortedNumbers = null;
let processing = false;



app.get('/getSortedNumbers', (req, res) => {
  if (sortedNumbers) {
    processing = false;
    res.json(sortedNumbers)
  } else {
    res.send("Ainda em processamento");
  }
})

app.get('/startGetNumbers', (req, res) => {
  if (processing == false) {
    processing = true;
    sortedNumbers = null;
    console.log("Comecei");

    const th = new Worker(__dirname + "/worker.js");
    th.on("message", (result) => {
      sortedNumbers = result;
      
    })
    th.postMessage(sortedNumbers);
  }
  res.send("Iniciei");
})

app.listen(port, function () {
  console.log("Servior rodando na porta " + port);
})
