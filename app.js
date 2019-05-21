const express = require('express');
const morgan = require('morgan');
const path = require('path');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();

app.set('port', process.env.PORT ||4000);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', (req,res)=>{
    
    fetch('http://localhost:3000/api/Materia')
    .then(resp => resp.json())
    .then(resp =>{
        recuperar = resp;
        
        res.render('MostrMat', {resp});
    });
    
})

app.get('/MostrPrac', function(req, res){
    
    res.render('MostrPrac');
})

app.get('/EditText', (req,res)=>{
    res.render('EditText');
})

app.get('/EditCod', (req,res)=>{
    res.render('EditCod');
})

app.listen(app.get('port'),()=>{
    console.log(`servidor Web en puerto ${app.get('port')}`)
});