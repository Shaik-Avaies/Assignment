const mysql = require('mysql');

var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'workIndia'
  });


  db.connect(function(err){
      if(err){
          console.log("Error in connecting");
          return ;
      }
      console.log("MySql Connected Successfully");
  });

  module.exports = db;
