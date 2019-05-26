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


app.get('/MostrPrac', function(req, res){
    fetch('http://localhost:7777/api/practica')
    .then(resp => resp.json())
    .then(resp =>{
        console.log(resp)
        return res.render('MostrPrac', {resp});
    })
});
app.get('/EditText', (req,res)=>{
    fetch('http://localhost:7777/api/practica')
    .then(resp => resp.json())
    .then(resp =>{
        console.log(resp)
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

app.get('/EditCod', (req,res)=>{
    res.render('EditCod');
})

app.get('/EditText1', (req,res)=>{
    fetch('http://localhost:7777/api/practica')
    .then(resp => resp.json())
    .then(resp =>{
        console.log(resp)
        return res.render('EditText1', {resp});
    })
});

app.get('/delete/:id',(req,res)=>{
    console.log('///////////delete')
    console.log(req.body._id)
    res.send("eliminado")
})

////////////subir///////////////


app.post('/subir',(req,res)=>{
   console.log(req.file);
});










app.listen(app.get('port'),()=>{
    console.log(`servidor Web en puerto ${app.get('port')}`)
});
