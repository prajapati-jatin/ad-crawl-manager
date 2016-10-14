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

    });
    return dfd.promise;
}

module.exports = service;