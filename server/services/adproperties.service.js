var config = require('config.json');
var dbstore = require('server/dbstores/mssqldbstore');
var _ = require('lodash');
var Q = require('q');

var service = {};

service.getAllADProperties = function(){
    var dfd = Q.defer();
    dbstore.executeQuery('GetAllADProperties', null, null).then(function(recordset){
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

service.addADProperty = function(data){
    var dfd = Q.defer();
    var resp = {
        success: true
    };
    try{
        /**
         * First check if given AD property exists or not.
         */
        var checkInputParam = [
            {
                name: 'Name',
                type: 'nvarchar',
                length: 256,
                value: data.Name
            }
        ];

        dbstore.executeQuery('GetADPropertyByName', checkInputParam).then(function(recordset){
            if(recordset && recordset.length > 0 && recordset[0].length > 0){
                resp.success = false;
                resp.data = 'AD property with given name already exists';
                resp.code = -2003;
                dfd.resolve(resp);
            }
            else{
                var inputParams = [            
                    {
                        name: 'Name',
                        type: 'nvarchar',
                        length: 256,
                        value: data.Name
                    },
                    {
                        name: 'NormalizedName',
                        type: 'nvarchar',
                        length: 256,
                        value: data.NormalizedName
                    },
                    {
                        name: 'Description',
                        type: 'nvarchar',
                        length: 'max',
                        value: data.Description
                    }
                ];
                dbstore.executeQuery('AddADProperty', inputParams, null).then(function(recordset){
                    if(recordset && recordset.length > 0 && recordset[0].length > 0){
                        resp.data = recordset;
                        dfd.resolve(resp);
                    }
                    else{
                        resp.success = false;
                        resp.data = 'Error in creating AD Property.';
                        resp.code = -2002;
                        dfd.resolve(resp);
                    }
                }).catch(function(error){
                    resp.success = false;
                    resp.data = error;
                    dfd.resolve(resp);
                });
            }
        });        
    }
    catch(ex){
        console.log('Error in add ad property');
        console.log(ex);
        dfd.reject(ex);
    }
    return dfd.promise;
};

service.deleteADPropertyById = function(id){
    var dfd = Q.defer();
    var resp = {
        success: true
    };
    var inputParam = [
        {
            name: 'Id',
            type: 'uniqueidentifier',
            value: id
        }
    ];
    dbstore.executeQuery('DeleteADPropertyById', inputParam).then(function(recordset){
        console.log(recordset);
        dfd.resolve(resp);
    }).catch(function(error){
        resp.success = false;
        resp.data = error;
        dfd.resolve(resp);
    });
    return dfd.promise;
}

module.exports = service;