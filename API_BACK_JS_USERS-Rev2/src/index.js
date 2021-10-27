const {response} = require ('express');

const express = require ('express');
const {v4:uuidv4} = require ('uuid');

const app = express();

//  Alterando aqui  - Teste Basico com o servidor
// app.get('/', (req, res) => {
//     // res.send ("Hello gys !");
//     res.json({res: "Hello world !"})
// });

//Necessário este middleware para interpretrar o json
app.use(express.json());

//como não tenho um modulo para armazenar meus dados, utilizarei um array aqui na index
const users = [];

app.post('/user', (req, res) => {
    const {name , email, cpf, phone} = req.body;

    const unserExist = users.some(
        //erofunct = Faz a verificação (user, pega cada usuario do array) => user.cpf === cpf
        (user) => user.cpf === cpf
    );

    if(unserExist) {
        return res.status(400).json({error: "Usuário já existe"})
    }else{
        const user = {
            id: uuidv4(),
            name,
            email,
            cpf,
            phone
        }
        users.push(user);
        res.status(201).json(user)
    }

});

// T.120 
app.get('/user', (req, res) => {
    return res.status(200).json(users)
})

app.get('/user/:cpf', (req, res) => {
    const {cpf} = req.params;
    //confirmar aqui {}
    //passando um parametro e do ususario    
    const user = users.find((e) => e.cpf === cpf)
    if(user){
        return res.status(200).json(user)
    }else{
        return res.status(400).json({error: "Usuário não encontrado"}) 
    }    
})

// T.137
app.put('/user/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, cpf, phone } = req.body;

    const user = users.find((e)=> e.id === id);
    // (user) => user.cpf === cpf
    
    if(!user) {
        return res.status(400).json({error: "Usuário não encontrado"})
    }else{
        user.name = name;
        user.email = email;
        user.cpf = cpf;
        user.phone = phone;

        return res.status(200).json(user);

    }

})

app.delete('/user/:id', (req, res) => {
    const { id } = req.params;
    // console.log(id)
    const idValidator = users.some((e) => e.id === id);
      if (idValidator) {
        users.splice(users.indexOf(id), 1);
        return res.status(200).json(users);
    } else {
        res.status(400).json({error: 'Erro ao apagar o usuário'});
    }
}); 

app.listen(3333);

// Base Line - ok 
//     user.push({
//         id: uuidv4(),
//         name,
//         email,
//         cpf,
//         phone
//     });
//     res.status(201).send("Sucesso")
// });


// function soma(a,b){
//     return a+b
// }
// const soma =(a,b)=> a+b

// app.get('/', (request, response)=>{
//     response.json({response:'Hello new Word'})
// })
