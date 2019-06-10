const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();

app.set('port', process.env.PORT ||4000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static("public"));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));



app.get('/', (req,res)=>{
    
    fetch('http://localhost:7777/api/materia')
    .then(resp => resp.json())
    .then(resp =>{
        console.log("de la api///",resp)
        return res.render('MostrMat', {resp});
    });
    
})

app.get('/ArchSub', (req,res)=>{
    
    fetch('http://localhost:7777/subirArchivo')
    .then(resp => resp.json())
    .then(resp =>{
        return res.render('ArchSub', {resp});
    });
    
})

app.get('/EditText1', function(req, res){
    res.render('/EditText1')
});

app.get('/MostrPrac', function(req, res){
    fetch('http://localhost:7777/api/practica')
    .then(resp => resp.json())
    .then(resp =>{
        //console.log(resp)
        return res.render('MostrPrac', {resp});
    })
});
app.get('/EditText', (req,res)=>{
    fetch('http://localhost:7777/api/practica')
    .then(resp => resp.json())
    .then(resp =>{
        //console.log(resp)
        return res.render('EditText', {resp});
    })
});

app.post('/MostrPrac',(req,res)=>{
    var datos = {
        titulo : req.body.titulo,
        texto : req.body.texto
    };
    var metodo = {
        method: 'POST',
        body: JSON.stringify(datos),
        headers:{
          'Content-type' : "application/json"
         }
        };
        fetch('http://localhost:7777/api/practica', metodo)
        .then(res => res.json())
        .then(resp =>{
            console.log(resp)
            
            return res.redirect('/MostrPrac');
        })
        .catch(error => console.error('Error:', error))
        .then(data => {
          console.log(data);
         
        })
});


app.put('/MostrPrac',(req,res)=>{
    console.log("////Put////")
    console.log(req)
});

app.get('/EditCod', (req,res)=>{
    res.render('EditCod');
})

app.get('/EditPract/:id', (req,res)=>{
    var id = req.params

    //console.log("------>  updateID: ",id.id)
    fetch('http://localhost:7777/api/practica/'+id.id)
    .then(resp => resp.json())
    .then(resp =>{
        console.log(resp)
        return res.render('EditText1', {resp});
    })
});










app.listen(app.get('port'),()=>{
    console.log(`servidor Web en puerto ${app.get('port')}`)
});
