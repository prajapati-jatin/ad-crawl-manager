var config = require('config.json');
var express = require('express');
var router = express.Router();
var applicationService = require('server/services/application.service');

/**
 * API definition
 */
router.get('/list', getAllApplications);
router.get('/:id', getApplicationById);
router.post('/', addApplication);
router.delete('/:id', deleteApplication);
router.put('/', updateApplication);

module.exports = router;

/**
 * API handler method to get all ad properties.
 */
function getAllApplications(req, res){
    applicationService.getAllApplications().then(function(resp){
        res.send(resp);
    }).catch(function(error){
        res.status(400).send(error);
    });
}

function getApplicationById(req, res){
    var id = req.params.id;
    applicationService.getApplicationById(id).then(function(resp){
        res.send(resp);
    }).catch(function(error){
        res.status(400).send(error);
    });
}

function addApplication(req, res){
    applicationService.addApplication(req.body).then(function(resp){
        res.send(resp);
    }).catch(function(error){
        res.status(400).send(error);
    });
}

function deleteApplication(req, res){
    console.log(req.params.id);
    applicationService.deleteApplication(req.params.id).then(function(resp){
        res.send(resp);
    }).catch(function(error){
        res.status(400).send(error);
    })
}

function updateApplication(req, res){
    applicationService.updateApplication(req.body).then(function(resp){
        res.send(resp);
    }).catch(function(error){
        res.status(400).send(error);
    });
}