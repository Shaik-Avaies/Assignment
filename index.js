const express = require('express');
const path = require('path');
const port = 3000;

const app = express();

app.use(express.urlencoded());

const cookie_parser = require('cookie-parser');
app.use(cookie_parser());

// bcrypt = require('bcryptjs');


app.set('view engine','ejs');
app.set('views',path.join(__dirname,"views"));

app.use('/',require('./routers'));

app.listen(port,function(err,result){
    if(err){
        console.log("Error in listening the port");
        return ;
    }
    console.log("Successfully Connected");
});