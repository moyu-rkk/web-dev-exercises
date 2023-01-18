const express = require('express')
const app = express()
const port = 3000

app.get("/", function(req, res){
  // console.log(request);
  res.send("<h1>Hola</h1>");
});

app.get("/contact", function(req, res){
  res.send("Contact me.");
});

app.get("/about", function(req, res){
  res.send("欢迎来到米奇妙妙屋");
});

app.get("/hobbies", function(req, res){
  res.send("<ul><li>Coding</li><li>Football</li><li>Kpop</li></ul>");
});

app.listen(3000, function(){
  console.log("server on");
});
