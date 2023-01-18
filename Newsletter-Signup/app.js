const express = require("express");
const bodyParser = require("body-parser");
//const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})


app.post("/", function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data ={
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  console.log(firstName, lastName, email);
})

app.listen(3000, function(){
  console.log("new app running")
})


//f836233bca67e5d32066ece4da054a38-us21
//09ae4912f8
