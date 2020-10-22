const db = require('../config/database');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');


module.exports.signUp = function(req,res){
    if(req.cookies.id){
        return res.redirect('/');
    }
    return res.render('signUp');
}

module.exports.signIn = function(req,res){
    if(req.cookies.id){
        return res.redirect('/');
    }
    console.log(res.status);
    return res.render('signIn');
}

module.exports.signOut = function(req,res){
    console.log("Coming");
   res.clearCookie("id");
   return res.redirect('/');
}

module.exports.register = function(req,res){
    const {username,password} = req.body;
    if(!username || !password){
        console.log("Enter All the Fileds");
        return res.redirect('/app/signUp');
    }
    db.query("select username from users where username = ?",[username], function(err,result){
        if(err){
            console.log("Error in accessing the database");
            return ;
        }
        if(result.length > 0){
            console.log("UserName is already Exists");
            return res.redirect('/app/signIn');
        }
        else{
            res.json({ status: 'Account Created' });
            const encryptedPassword = cryptr.encrypt(password);
            db.query("insert into users (username,password) values (?,?)",[username,encryptedPassword],function(err,result){
                if(err){
                    console.log("Error in accessing the database");
                    return ;
                }
                console.log("Successfully inserted into the database");
            });
            return res.redirect('/app/signIn');
        }
    });
}



module.exports.login = function(req,res){
    const {username,password} = req.body;
    if(!username || !password){
        console.log("Enter All the Fileds");
        return res.redirect('/app/signIn');
    }
    db.query("select * from users where username = ?",[username],function(err,result){
        if(err){
            console.log("Error in accessing the database");
            return ;
        }
        if(result.length == 0){
            console.log("UserName is not exist in database");
            return res.redirect('/app/signUp');
        }
        const decryptedPassword = cryptr.decrypt(result[0].password);
        console.log(decryptedPassword);
        if(decryptedPassword != password){
            console.log("Incorrect Password");
            return res.redirect('/app/signUp');
        }
        res.json({ status: 'Success',
                   userId: result[0].id });
        res.cookie('id',result[0].id);
        return res.redirect('/');
    });
}