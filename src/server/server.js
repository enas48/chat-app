const express=require('express');
const app=express();

app.use(express.static('dist'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine','pug');

app.get('/',function(req,res){
    res.render('/dist/index.html',{name:'enas'})
})
app.get('/login',function(req,res){
    res.render('/dist/login.html',{name:'enas'})
})
const server = app.listen(process.env.PORT ||3000, () => {
    console.log(`server is running on localhost:3000`);
  });