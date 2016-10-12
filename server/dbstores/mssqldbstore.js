var sql = require('mssql');
var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');

var mssqldbstore = {};

mssqldbstore.executeNonQuery = function(procedureName, inputParameters, outputParameters){
    var dfd = Q.defer();
    sql.connect(config.mssqlconnectionconfig).then(function(){
        //We are connected to MS SQL Server successfully.
        var request = new sql.Request();
        if(inputParameters !== null && inputParameters !== undefined){
            _.forEach(inputParameters, function(param){
                request.input(param.name, getParamType(param), param.value);
            });
        }
        if(outputParameters !== null && outputParameters !== undefined){
            _.forEach(outputParameters, function(param){
                request.output(param.name, getParamType(param));
            });
        }

        request.execute(procedureName).then(function(recordset){
            console.dir(recordset);
            dfd.resolve(recordset);
        }).catch(function(error){
            console.log('In error executeNonQuery');
            console.log(error);
            //TODO: Check for errors.
            dfd.reject(error);
        });
        dfd.resolve();
    }).catch(function(error){
        dfd.reject(error);
        //Check for connection errors.
    });
    return dfd.promise;
}

mssqldbstore.executeQuery = function(procedureName, inputParameters, outputParameters){
    var dfd = Q.defer();
    sql.connect(config.mssqlconnectionconfig).then(function(){
        //We are connected to MS SQL Server successfully.
        var request = new sql.Request();
        if(inputParameters !== null && inputParameters !== undefined){
            _.forEach(inputParameters, function(param){
                request.input(param.name, getParamType(param), param.value);
            });
        }
        if(outputParameters !== null && outputParameters !== undefined){
            _.forEach(outputParameters, function(param){
                request.output(param.name, getParamType(param));
            });
        }

        request.execute(procedureName).then(function(recordset){
            //console.log(recordset);
            dfd.resolve(recordset);
        }).catch(function(error){
            //TODO: Check for errors.
            console.log('In error executeQuery');
            console.log(error);
            dfd.reject();
        });
        //dfd.resolve();
    }).catch(function(error){
        console.log('In error connect');
        console.log(error);
        //Check for connection errors.
    });
    return dfd.promise;
}

function getParamType(param){        
    if(param.length === 'max'){
        param.length = sql.MAX;
    }
    switch(param.type.toLowerCase()){        
        case 'bit':
            return sql.Bit
        case 'bigint':
            return sql.BigInt;
        case 'decimal':
            return sql.Decimal(param.precision, param.scale);
        case 'float':
            return sql.Float;
        case 'int':
            return sql.Int;
        case 'money':
            return sql.money;
        case 'numeric':
            return sql.Numeric(param.precision, param.scale);
        case 'smallint':
            return sql.SmallInt;
        case 'smallmoney':
            return sql.SmallMoney;
        case 'real':
            return sql.Real;
        case 'tinyint':
            return sql.TinyInt;

        case 'char':
            return sql.Char(param.length);
        case 'nchar':
            return sql.NChar(param.length);
        case 'text':
            return sql.Text;
        case 'ntext':
            return sql.NText;
        case 'varchar':
            return sql.VarChar(param.length);
        case 'nvarchar':
            return sql.NVarChar(param.length);
        case 'xml':
            return sql.Xml;
        
        case 'time':
            return sql.Time(param.scale);
        case 'date':
            return sql.Date;
        case 'datetime':
            return sql.DateTime;
        case 'datetime2':
            return sql.DateTime2(param.scale);
        case 'datetimeoffset':
            return sql.DateTimeOffset(param.scale);
        case 'smalldatetime':
            return sql.SmallDateTime;

        case 'uniqueidentifier':
            return sql.UniqueIdentifier;

        case 'variant':
            return sql.Variant;

        case 'binary':
            return sql.Binary;
        case 'varbinary':
            return sql.VarBinary(param.length);
        case 'image':
            return sql.Image;

        case 'udt':
            return sql.UDT;
        case 'geography':
            return sql.Geography;
        case 'geometry':
            return sql.Geometry;
    }
}

module.exports = mssqldbstore;