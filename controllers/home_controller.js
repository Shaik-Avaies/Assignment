const db = require('../config/database');

module.exports.home = function(req,res){
    return res.render('home',{
        title:"Home Page",
        id: req.cookies.id
    });
}