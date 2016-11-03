var config = require('config.json');
var dbstore = require('server/dbstores/mssqldbstore');
var _ = require('lodash');
var Q = require('q');

var service = {};

service.getAllApplications = function(){
    var dfd = Q.defer();
    dbstore.executeQuery('GetAllApplications', inputParams).then(function(recordset){
        var resp = {
            success: true
        };
        if(recordset && recordset.length > 0 && recordset[0].length > 0){
            resp.data = recordset;
            dfd.resolve(resp);
        }
        else{
            resp.success = false;
            resp.data = 'No data found';
            resp.code = -2001;
            dfd.resolve(resp);
        }
    }).catch(function(error){
        dfd.reject(error);
    });
    return dfd.promise;
}

/**
 * Gets an application based on given name.
 */
service.getApplicationByName = function(name){
    var dfd = Q.defer();
    var resp = {
        success: true
    };
    var param = [
        {
            name: 'Name',
                type: 'nvarchar',
                length: 256,
                value: name
        }
    ];
    dbstore.executeQuery('GetApplicationByName', param).then(function(recordset){
        if(recordset && recordset.length > 0 && recordset[0].length > 0){
            resp.data = recordset;
            dfd.resolve(resp);
        }
        else{
            resp.success = false;
            resp.data = 'Application not found';
            resp.code = -2005;
            dfd.resolve(resp);
        }
    }).catch(function(error){
        dfd.reject(error);
    });
    return dfd.promise;
}

service.addApplication = function(data){
    var dfd = Q.defer();
    var resp = {
        success: true
    };
    try{
        //Check if application exists or not.
        this.getApplicationByName(data.Name).then(function(resp){
            if(resp.success && resp.data && res.data.length > 0 && resp.data[0].length > 0){
                resp.success = false;
                resp.data = 'Application already exists with given name.';
                resp.code = -2006;
                dfd.resolve(resp);
            }
            else{
                var inputParams = [
                    {
                        name: 'Id',
                        type: 'uniqueidentifier',
                        value: data.Id
                    },
                    {
                        name: 'Name',
                        type: 'nvarchar',
                        length: 256,
                        value: data.Name
                    },
                    {
                        name: 'Description',
                        type: 'nvarchar',
                        length: 'max',
                        value: data.Description
                    },
                    {
                        name: 'Settings',
                        type: 'xml',
                        value: data.Settings
                    }
                ];
                dbstore.executeQuery('AddApplication', inputParams).then(function(recordset){
                    var resp = {
                        success: true
                    };
                    if(recordset && recordset.length > 0 && recordset[0].length > 0){
                        resp.data = recordset;
                        dfd.resolve(resp);
                    }
                    else{
                        resp.success = false;
                        resp.data = 'Error while creating application';
                        resp.data = -2004;
                        dfd.resolve(resp);
                    }
                }).catch(function(error){
                    dfd.reject(error);
                });
            }
        }).catch(function(error){
            dfd.reject(error);
        });
    }
    catch(ex){
        console.log(ex);
        dfd.reject(ex);
    }    
    return dfd.promise;
}

module.exports = service;