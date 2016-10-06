var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
    res.render('index', { title: 'MEA2N' });
});

router.get('/token', function(req, res){
    //console.log(req.headers);
    console.log(req.session.token);
    //var token = req.session.token;
    res.send(req.session.token);
});

router.get('/logout', function(req, res){
   console.log('In logout');
   //req.logout();
   req.session.destroy();
   res.status(200).send('OK');
});

module.exports = router;