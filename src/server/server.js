const express=require('express');
const app=express();

app.use(express.static('dist'));

app.get('/',function(req,res){
    res.sendFile("dist/index.html");
})
const server = app.listen(3000, () => {
    console.log(`server is running on localhost:3000`);
  });