const axios = require('axios');
const{parentPort} = require('worker_threads');
const url = "http://challenge.dienekes.com.br/api/numbers?page=";

parentPort.on("message",(sortedNumbers)=>{
    startGetNumber().then(function (grupoPage) {
        console.log("Acabei")       
        parentPort.postMessage(selectionSort(grupoPage));
      }) 
   
})

async function startGetNumber() {

    let i = 1;
    let page = [];
    let grupoPage = [];
  
    while (page != null) {
      page = await getNumbersByPage(i);
      if (page != null) {
        grupoPage = grupoPage.concat(page);
      }
      console.log(i);
      i++;
  
    }
    return grupoPage;
  }
  
  
  async function getNumbersByPage(page) {
    const request = await axios.get(url + page);
    return request.data.numbers.length == 0 ? null : request.data.numbers;
  }
  
  function selectionSort(arr) {
    var minIdx, temp,
      len = arr.length;
    for (var i = 0; i < len; i++) {
      minIdx = i;
      for (var j = i + 1; j < len; j++) {
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }
      temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;
    }
    return arr;
  }