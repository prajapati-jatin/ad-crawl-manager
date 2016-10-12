var config = require('config.json');
var dbstore = require('server/dbstores/mssqldbstore');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');

var service = {};

service.authenticate = authenticate;
service.getById = getById;
service.create = create;
service.update = update;
service.deleteById = deleteById;
service.deleteByUserName = deleteByName;
service.getAllUsers = getAllUsers;
service.getUserByName = getUserByName;

module.exports = service;

/**
 * Get all the users from data store.
 */
function getAllUsers(){
    dbstore.executeQuery('GetUsers').then(function(resp){
        console.log('In getAllUsers');
        console.log(resp);
    }).catch(function(error){
        console.log('In getAllUsers error');
        console.log(error);
    });
}

/**
 * Authenticates the user by provided username and password.
 */
function authenticate(userName, password){
    var dfd = Q.defer();
    try{        
        var inputParams = [
            {
                name: 'UserName',
                type: 'nvarchar',
                length: 256,
                value: userName
            }
        ];
        dbstore.executeQuery('AuthenticateUser', inputParams).then(function(recordset){
            var resp = {
                success: true,
            };
            if(recordset){
                if(recordset[0].length === 1){
                    var user = recordset[0][0];                    
                    if(bcrypt.compareSync(password.trim(), user.PasswordHash)){
                        if(user.EmailConfirmed){
                            resp.data = jwt.sign({sub: user.Id, uname: user.UserName}, config.secret)
                            dfd.resolve(resp);
                        }
                        else{
                            resp.success = false;
                            resp.data = 'Email is not confirmed';
                            resp.code = -1002;
                            dfd.resolve(resp);
                        }
                    }
                    else{
                        resp.success = false;
                        resp.data = 'Invalid credentials';
                        resp.code = -1001;
                        dfd.resolve(resp);
                    } 
                }
            }
            else{
                resp.success = false;
                resp.data = 'Invalid credentials';
                resp.code = -1001;
                dfd.resolve(resp);
            }
                   
        }).catch(function(error){
            console.log(error);
            dfd.reject(error);
        });
    }
    catch(ex){        
        dfd.reject(ex);
    }
    return dfd.promise;
}

/**
 * Get user by provided user name.
 */
function getUserByName(userName){
    dbstore.executeQuery('GetUserByName', [{
        name: 'Name',
        type: 'nvarchar',
        length: 256,
        value: userName
    }]).then(function(resp){
        console.log(resp);
    }).catch(function(error){
        console.log(error);
    });
}

/**
 * Gets the user by provided id.
 */
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

/**
 * Creates a new user based on given data.
 */
function create(data){
    var dfd = Q.defer();
    var inputParams = [        
        {
            name: 'Id',
            type: 'nvarchar',
            length: 450,
            value: data.Id
        },
        {
            name: 'UserName',
            type: 'nvarchar',
            length: 256,
            value: data.UserName
        },
        {
            name: 'NormalizedUserName',
            type: 'nvarchar',
            length: 256,
            value: data.NormalizedUserName
        },
        {
            name: 'PasswordHash',
            type: 'nvarchar',
            langth: 'max',
            value: data.PasswordHash
        },
        {
            name: 'Email',
            type: 'nvarchar',
            length: 256,
            value: data.Email
        },
        {
            name: 'EmailConfirmed',
            type: 'bit',
            value: data.EmailConfirmed
        },
        {
            name: 'NormalizedEmail',
            type: 'nvarchar',
            length: 256,
            value: data.NormalizedEmail
        },
        {
            name: 'AccessFailedCount',
            type: 'int',
            value: data.AccessFailedCount
        },
        {
            name: 'ConcurrancyStamp',
            type: 'nvarchar',
            length: 'max',
            value: data.ConcurrencyStamp
        },
        {
            name: 'LockoutEnabled',
            type: 'bit',
            value: data.LockoutEnabled
        },            
        {
            name: 'PhoneNumber',
            type: 'nvarchar',
            length: 'max',
            value: data.PhoneNumber
        },
        {
            name: 'PhoneNumberConfirmed',
            type: 'bit',
            value: data.PhoneNumberConfirmed
        },
        {
            name: 'RoleId',
            type: 'nvarchar',
            length: 450,
            value: null
        },
        {
            name: 'LockoutEnd',
            type: 'datetimeoffset',
            length: 7,
            value: null
        }        
    ];
    console.log(inputParams.length);
    dbstore.executeNonQuery('CreateUser', inputParams).then(function(resultset){
        console.log(resultset);
        dfd.resolve(resultset);
    }).catch(function(error){
        dfd.reject(error);
    });
    return dfd.promise;
}

/**
 * Updates the existing user based on given data.
 */
function update(_id, data){
    var dfd = Q.defer();
        
    return dfd.promise;
}

/**
 * Deletes the existing user based on given id.
 */
function deleteById(_id){
    var dfd = Q.defer();
        
    return dfd.promise;
}

/**
 * Deletes the user based on given username.
 */
function deleteByName(username){
    var dfd = Q.defer();

    return dfd.promise;
}