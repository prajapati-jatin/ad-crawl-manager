var config = require('config.json');
var express = require('express');
var router = express.Router();
var adproperties = require('server/services/adproperties.service');

/**
 * API definition
 */
router.get('/list', getAllADProperties);
router.post('/add', addADProperty);
router.delete('/:id', deleteADPropertyById);
router.post('/changedefaultflag', changeADPropertyDefaultFlag);

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

function addADProperty(req, res){
    adproperties.addADProperty(req.body).then(function(resp){
        console.log(resp);
        res.send(resp);
    }).catch(function(error){
        res.status(400).send(error);
    })
}

function deleteADPropertyById(req, res){
    console.log(req.params.id);
    adproperties.deleteADPropertyById(req.params.id).then(function(resp){
        res.send(resp);
    }).catch(function(error){
        res.status(400).send(error);
    })
}

function changeADPropertyDefaultFlag(req, res){
    adproperties.changeADPropertyDefaultFlag(req.body).then(function(resp){
        res.send(resp);
    }).catch(function(error){
        res.status(400).send(error);
    });
}