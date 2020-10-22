const db = require('../config/database');

module.exports.addWebsite = async function(req,res){
    const u_id = req.params.user;
    const {website,username,password} = req.body;
    db.query("insert into info (user_id,website,username,password) values (?,?,?,?)",[u_id,website,username,password],function(err,result){
        if(err){
            console.log("Error in connecting to databse");
            return ;
        }
        console.log("Successfully added data into database");
        return res.redirect('/');
    });   
}


module.exports.listOfWebsites = function(req,res){
    const u_id = req.params.user;
    db.query("select * from info where user_id = ?",[u_id],function(err,result){
        if(err){
            console.log("Error in conning to databse");
            return ;
        }
        res.json({ status: 'Success'});
        return res.render("information",{
            info: result
        });
    });
}