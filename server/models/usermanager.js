var dbstore = require('server/dbstores/mssqldbstore');
var user = require('server/models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Q = require('q');
var _ = require('lodash'); 
var role = require('./role');
var config = require('config.json');

var userManager = {};

/**
 * Get all the users from data store.
 */
userManager.getAllUsers = function(){
    dbstore.executeQuery('GetUsers').then(function(resp){
        console.log('In getAllUsers');
        console.log(resp);
    }).catch(function(error){
        console.log('In getAllUsers error');
        console.log(error);
    });
}

userManager.getUserByName = function(userName){
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

userManager.authenticate = function(userName, password){
    var dfd = Q.defer();
    try{        
        var inputParams = [
            {
                name: 'UserName',
                type: 'nvarchar',
                length: 256,
                value: userName
            }
        ]
        dbstore.executeQuery('AuthenticateUser', inputParams).then(function(resultset){
            //console.log(resultset);
            if(resultset){
                if(resultset[0].length === 1){
                    var user = resultset[0][0];                    
                    if(bcrypt.compareSync(password.trim(), user.PasswordHash)){
                        if(user.EmailConfirmed){
                            dfd.resolve(jwt.sign({sub: user.Id, uname: user.UserName}, config.secret));
                        }
                        else{
                            dfd.reject({error: 'Email not confirmed.'});
                        }
                    }
                    else{
                        dfd.reject({error: 'Invalid credentials.'});
                    } 
                }
            }
                   
        }).catch(function(error){
            console.log(error);
        });
    }
    catch(ex){
        console.log('Error in authenticate');
        console.log(ex);
    }
    return dfd.promise;
}

userManager.createUser = function(user){
    var dfd = Q.defer();
    //console.log(user);
    try{
        var inputParams = [
            {
                name: 'Id',
                type: 'nvarchar',
                length: 450,
                value: user.data.Id
            },
            {
                name: 'UserName',
                type: 'nvarchar',
                length: 256,
                value: user.data.UserName
            },
            {
                name: 'NormalizedUserName',
                type: 'nvarchar',
                length: 256,
                value: user.data.NormalizedUserName
            },
            {
                name: 'PasswordHash',
                type: 'nvarchar',
                langth: "max",
                value: user.data.PasswordHash
            },
            {
                name: 'Email',
                type: 'nvarchar',
                length: 256,
                value: user.data.Email
            },
            {
                name: 'EmailConfirmed',
                type: 'bit',
                value: user.data.EmailConfirmed
            },
            {
                name: 'NormalizedEmail',
                type: 'nvarchar',
                length: 256,
                value: user.data.NormalizedEmail
            },
            {
                name: 'AccessFailedCount',
                type: 'int',
                value: user.data.AccessFailedCount
            },
            {
                name: 'ConcurrencyStamp',
                type: 'nvarchar',
                length: "max",
                value: user.data.ConcurrencyStamp
            },
            {
                name: 'LockoutEnabled',
                type: 'bit',
                value: user.data.LockoutEnabled
            },            
            {
                name: 'PhoneNumber',
                type: 'nvarchar',
                length: "max",
                value: user.data.PhoneNumber
            },
            {
                name: 'PhoneNumberConfirmed',
                type: 'bit',
                value: user.data.PhoneNumberConfirmed
            },
            {
                name: 'Email',
                type: 'nvarchar',
                length: 256,
                value: user.data.Email
            },
            {
                name: 'RoleId',
                type: 'nvarchar',
                length: 450,
                value: null
            },
            {
                name: 'LockourEnd',
                type: 'datetimeoffset',
                length: 7,
                value: null
            }
        ];
        console.log(inputParams);
        dbstore.executeNonQuery('CreateUser', inputParams, null).then(function(resultset){
            console.log('Success: CreateUser');
            console.log(resultset);
            dfd.resolve(resultset);
        }).catch(function(error){
            console.log('Error in CreateUser');
            console.log(error);
            dfd.reject(error);
        });
    }
    catch(ex){
        console.log(ex);
    }

    return dfd.promise;
}
module.exports = userManager;