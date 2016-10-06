var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('users');

var service = {};

service.authenticate = authenticate;
service.getById = getById;
service.create = create;
service.update = update;
service.delete = _delete;

module.exports = service;

function authenticate(username, password){
    console.log(username);
    console.log(password);
    var dfd = Q.defer();
    db.users.findOne({username: username.trim()}, function(err, user){
        if(err) dfd.reject(err.name + ': ' + err.message);
        if(user && bcrypt.compareSync(password.trim(), user.hash)){
            //authentication successful
            dfd.resolve(jwt.sign({sub: user._id}, config.secret));
        }
        else{
            //authentication failed.
            dfd.resolve();
        }
    });
    
    return dfd.promise;
}

function getById(_id){
    var dfd = Q.defer();
    db.users.findById(_id, function(err, user){
        if(err) dfd.reject(err.name + ': ' + err.message);
        if(user){
            //return user without hasned password
            dfd.resolve(_.omit(user, 'hash'));
        }
        else{
            dfd.resolve();
        }
    });
    
    return dfd.promise;
}

function create(userParam){
    var dfd = Q.defer();
    
    db.users.findOne({
        username: userParam.username
    }, function(err, user){
        if(err) dfd.reject(err.name + ': ' + err.message);
        if(user){
            dfd.reject('Username "' + userParam.username + '" is already taken.');
        }
        else{
            createUser();
        }
    });
    
    function createUser(){
        var user = _.omit(userParam, 'password');
        user.hash = bcrypt.hashSync(userParam.password, 10);
        user.created = new Date();
        user.modified = new Date();
        user.registrationdate = new Date();
        user.lastlogindate = null;
        db.users.insert(user, function(err, doc){
            if(err) dfd.reject(err.name + ': ' + err.message);
            dfd.resolve();
        });
    }
    
    return dfd.promise;
}

function update(_id, userParam){
    var dfd = Q.defer();
    
    db.users.findById(_id, function(err, user){
        if(err) dfd.reject(err.name + ': ' + err.message);
        if(user.username !== userParam.username){
            db.users.findOne({
                username: userParam.username
            }, function(err, user){
                if(err) dfd.reject(err.name + ': ' + err.message);
                
                if(user){
                    //username already taken
                    dfd.reject('Username "' + req.body.username + '" is already taken.');
                }
                else{
                    updateUser();
                }
            });
        }
        else{
            updateUser();
        }
    });
    
    function updateUser(){
        var set = {
            firstname: userParam.firstname,
            lastname: userParam.lastname,
            email: userParam.email,
            username: userParam.username,
            modified: new Date()
        };
        
        if(userParam.password){
            set.hash = bcrypt.hashSync(userParam.password, 10);
        }
        
        db.users.update({
            _id: mongo.helper.toObjectID(_id)
        }, {
            $set: set
        }, function(err, doc){
            if(err) dfd.reject(err.name + ': ' + err.message);
            dfd.resolve();
        })
    }
    
    return dfd.promise;
}

function _delete(_id){
    var dfd = Q.defer();
    db.users.remove({
        _id: mongo.helper.toObjectID(_id)
    }, function(err){
        if(err) dfd.reject(err.name + ': ' + err.message);
        dfd.resolve();
    });
    
    return dfd.promise;
}