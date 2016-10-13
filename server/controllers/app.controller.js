var express = require('express');
var userManager = require('server/services/user.service');
var router = express.Router();
var User = require('server/models/user');

router.get('/', function(req, res, next){
    res.render('index', { title: 'MEA2N' });
});

function createUser(){
    try{
        var u = new User({
            UserName: 'jatin.prajapati@outlook.com',
            Password: '!Passw0rd',
            Email: 'jatin.prajapati@outlook.com',
            PhoneNumber: '8511946279',
            LockoutEnabled: 0,
            PhoneNumberConfirmed: 1,
            EmailConfirmed: 1,
            AccessFailedCount: 0
        });
        userManager.create(u.data).then(function(resultset){
            console.log(resultset);
        }).catch(function(error){
            console.log('Error in app.controller: createUser');
            console.log(error);
        });
    }
    catch(ex){
        console.log('Error in createUser');
        console.log(ex);
    }
}

router.get('/token', function(req, res){
    //console.log(req.headers);
    console.log(req.session.token);
    //var token = req.session.token;
    res.send(req.session.token);
});

router.get('/logout', function(req, res){
   console.log('In logout');
   req.logout();
   req.session.destroy();
   res.status(200).send('OK');
});

router.get('/signoff', function(req, res){
    console.log('In signoff');
    //req.logout();
    req.session.destroy();
    res.status(200).send('OK');
});

module.exports = router;