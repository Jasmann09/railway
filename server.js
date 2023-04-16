require('dotenv').config()

const { error } = require('console')
const express=require('express')
const bodyParser=require('body-parser')
const { default: mongoose } = require('mongoose')
const app =express()
mongoose.connect(process.env.DATABASE_URL)
const db =mongoose.connection
db.on('error',(error)=>console.log(error))
db.once('open',()=>console.log('connected to database'))
const aa = require('./routes/rail')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine','ejs');
app.get('/test',(req,res)=>{
    res.render('home');
})
app.use('/rail',aa)
app.use(express.json());
app.listen(3010, ()=> console.log('server started'))