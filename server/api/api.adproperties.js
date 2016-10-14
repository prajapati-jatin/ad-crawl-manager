var config = require('config.json');
var express = require('express');
var router = express.Router();
var adproperties = require('server/services/adproperties.service');

/**
 * API definition
 */
router.get('/list', getAllADProperties);

module.exports = router;

/**
 * API handler method to get all ad properties.
 */
function getAllADProperties(req, res){
    adproperties.getAllADProperties().then(function(resp){
        res.send(resp);
    }).catch(function(err){
        res.status(400).send(err);
    });
}